const bcrypt = require('bcrypt');
const { queryWithOrderBy, queryWithWhere } = require('./helper');


module.exports = {
    Query: {
        user: async (_, { where }, { models }) => {
            try {
                //TODO: Check invalid data
                if (!where.id) throw 'ID_CANNOT_BE_NULL';

                //TODO: Get user data
                const user = await models.userModel.findById(where.id).exec();

                //TODO: Check user data
                if (!user) throw 'USER_NOT_FOUND';

                //TODO: Response user data
                return user;
            } catch (error) {
                console.log("error: ", error);
                throw new Error(error);
            }
        },

        users: async (_, { where, orderBy, skip, limit }, { models, req }) => {
            try {
                //TODO: Convert where data and orderBy data
                const _where = queryWithWhere(where);
                const _orderBy = queryWithOrderBy(orderBy);

                //TODO: Get total users with where data
                const allUser = await models.userModel.count(_where).exec();

                //TODO: Get users with where data
                const users = await models.userModel.find(_where)
                    .limit(limit || 40)
                    .skip(skip || 0)
                    .sort(_orderBy)
                    .exec();

                //TODO: Response users with total
                const ResponseUserData = { total: allUser, data: users };
                return ResponseUserData;

            } catch (error) {
                console.log("error: ", error);
                throw new Error(error);
            }
        }
    },

    Mutation: {
        createUser: async (_, { data }, { models, req }) => {
            try {

                //TODO: Check invalid data
                if (!data.username || !data.password) throw "USERNAME_OR_PASSWORD_CANNOT_BE_NULL";

                //TODO: Hash user password
                const hashPassword = await bcrypt.hash(data.password, 10);

                //TODO: Create User data
                const createUser = await models.userModel.create({ ...data, password: hashPassword });

                //TODO: ResponseData
                return createUser;

            } catch (error) {
                console.log("error: ", error);
                throw new Error(error);
            }
        },
        updateUser: async (_, { data, where }, { models, req }) => {
            try {
                //TODO: Check invalid data
                if (!where.id) throw 'ID_CANNOT_BE_NULL';

                //TODO: Update User data
                const updateUser = await models.userModel.findByIdAndUpdate(
                    where.id,
                    { ...data, updatedAt: Date.now()})

                //TODO: Response data
                return updateUser;

            } catch (error) {
                console.log("error: ", error);
                throw new Error(error)
            }
        },
        deleteUser: async (_, {where}, {models, req}) => {
            try {
                //TODO: Check invalid data
                if(!where.id) throw 'ID_CANNOT_BE_NULL';

                //TODO: Delete user data
                const deleteUser = await models.userModel.findByIdAndDelete(where.id);

                //TODO: Response Data
                return deleteUser;
            } catch (error) {
                console.log("error: ", error);
                throw new Error(error)
            }
        }
    }
}