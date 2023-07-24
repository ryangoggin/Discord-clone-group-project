from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.friend import Friend

def seed_friends():
    friends = [

    #Demo Friends 1
    Friend(userId=1, friendId=2),
    Friend(userId=1, friendId=3),
    Friend(userId=1, friendId=4),
    Friend(userId=1, friendId=5),
    Friend(userId=1, friendId=6),

    #Marnie Friends 2
    Friend(userId=2, friendId=1),
    Friend(userId=2, friendId=3),
    # Friend(userId=2, friendId=4),
    # Friend(userId=2, friendId=5),
    # Friend(userId=2, friendId=6),


    #Bobbie Friends 3
    Friend(userId=3, friendId=1),
    Friend(userId=3, friendId=2),
    Friend(userId=3, friendId=4),
    Friend(userId=3, friendId=5),
    Friend(userId=3, friendId=6),

    #AK Friends 4
    Friend(userId=4, friendId=1),
    # Friend(userId=4, friendId=2),
    Friend(userId=4, friendId=3),
    Friend(userId=4, friendId=5),
    Friend(userId=4, friendId=6),

    #ZM Friends 5
    Friend(userId=5, friendId=1),
    # Friend(userId=5, friendId=2),
    Friend(userId=5, friendId=3),
    Friend(userId=5, friendId=4),
    Friend(userId=5, friendId=6),


    #RG Friends 6
    Friend(userId=6, friendId=1),
    # Friend(userId=6, friendId=2),
    Friend(userId=6, friendId=3),
    Friend(userId=6, friendId=4),
    Friend(userId=6, friendId=5),
    Friend(userId=6, friendId=4),


    ]

    db.session.add_all(friends)
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
