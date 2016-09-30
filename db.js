var mongo = require('mongodb');

var monk = require('monk');

var db = monk('localhost:27017/testnode1');

db.get('usercollection').insert({
    username: 'aaa',
    email: 'bbb@126.com',
    desc: 'ddd'
}, function(err, doc) {
    if (err) {
        throw err;
    }
});

db.get('usercollection').find({}, {}, function(err, docs) {
    console.log(docs);
});


var DB = {
    insert: function(collection, datas, callback) {
        db.get(collection).insert(datas, function(err, doc) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, doc);
            }
        });
    },
    list: function(collection, callback) {
        db.get(collection).find({}, {}, function(err, docs) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, docs);
            }
        });
    }
};

module.exports = DB;
