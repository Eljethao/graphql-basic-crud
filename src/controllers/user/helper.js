const queryWithWhere = (where) => {
    let _where = where || {};
    if (where) {
        if (where.OR) {
            (_where = { ..._where, $or: [...where.OR] }), delete _where.OR;
        }
        if (where.createdAt_gte || where.createdAt_lt) {
            _where = {
                ..._where,
                createdAt: {
                    $gte: new Date(where.createdAt_gte),
                    $lt: new Date(where.createdAt_lt),
                }
            }
        }

        if (where.username) _where.username = { $regex: where.username }
        if (where.phone) _where.phone = { $regex: where.phone }

        if (where.createdAt_lt) delete _where.createdAt_lt;
        if (where.createdAt_gte) delete _where.createdAt_gte;
    }

    return where;
};

const queryWithOrderBy = (orderBy) => {
    let result;
    switch (orderBy) {
        case 'createdAt_ASC': 
            result = {createdAt: "asc"};
            break;
        case "createdAt_DESC": 
            result = {createdAt: "desc"};
            break;
        case "updatedAt_ASC": 
            result = {updatedAt: "asc"};
            break;
        case "updatedAt_DESC": 
            result = {updatedAt: "desc"};
            break;
        default: 
            result = {createdAt: "asc"};
            break;
    }
    return result;
}

module.exports = {queryWithWhere, queryWithOrderBy};