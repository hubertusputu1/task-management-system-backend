import mongoose from 'mongoose'
import passport from 'passport'

const Users = mongoose.model('Users');

class UsersController {
    static createUser(req, res, next) {
        const { body: { user } } = req;

        if(!user.email) {
            return res.status(422).json({
            errors: {
                email: 'is required',
            },
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        if(!user.name) {
            return res.status(422).json({
                errors: {
                    name: 'is required',
                },
            });
        }

        const finalUser = new Users(user);

        finalUser.setPassword(user.password);

        return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
    }

    static login(req, res, next) {
        const { body: { user } } = req;

        if(!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if(!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if(err) {
                return next(err);
            }

            if(passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.json({ user: user.toAuthJSON() });
            }

            return res.status(400).json(info);
        })(req, res, next);
    }

    static currentUser(req, res, next) {
        const { payload: { id } } = req;

        return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
    }

    static getUsers(req, res, next) {

        return Users.find({}, {_id: 1, email: 1, name:1, userRole:1})
        .then((users) => {
            if(!users) {
                return res.sendStatus(400);
            }

            return res.json({ users });
        });
    }
}

export default UsersController