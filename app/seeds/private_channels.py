from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.privateMessage import PrivateChannel

def seed_private_channels():
    private_channels = [
        # Demo DMs
        PrivateChannel(user_id = 1, user_two_id = 2), # 1 Demo + Marnie
        PrivateChannel(user_id = 1, user_two_id = 3), # 2 Demo + Bobbie
        PrivateChannel(user_id = 1, user_two_id = 4), # 3 Demo + Aileen
        PrivateChannel(user_id = 1, user_two_id = 5), # 4 Demo + Zaineb
        PrivateChannel(user_id = 1, user_two_id = 6), # 5 Demo + Ryan


        # Marnie DMs
        PrivateChannel(user_id = 2, user_two_id = 3), # 7 Marnie + Bobbie
        # PrivateChannel(user_id = 2, user_two_id = 4), # 8 Marnie + Aileen
        # PrivateChannel(user_id = 2, user_two_id = 5), # 9 Marnie + Zaineb
        # PrivateChannel(user_id = 2, user_two_id = 6), # 10 Marnie + Ryan
        ]

    db.session.add_all(private_channels)
    db.session.commit()


def undo_private_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.private_channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM private_channels"))

    db.session.commit()
