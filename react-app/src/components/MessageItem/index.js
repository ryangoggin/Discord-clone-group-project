import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './MessageItem.css';
import './Reaction.css'
import EmojisModal from '../EmojisModal/AllEmojisModal';

function MessageItem({ message }) {
    let allServers = useSelector(state => state.server.allUserServers);
    let { serverId } = useParams();

    let serverMembersArr;
    if (!allServers) return null;
    serverMembersArr = allServers[serverId]["members"];

    // normalize serverMembers to allow for keying to get sending user
    let serverMembers = {};
    serverMembersArr.forEach(member => {
        serverMembers[member.id] = member;
    });

    // get the sending user from normalized serverMembers
    let user = serverMembers[message.userId];

    // convert timestamp to a Date object to an ISO string, slice to get the date
    let messageTimestampDate = new Date(message.timestamp).toISOString().slice(0, 10);
    let messageTimestampTime = new Date(message.timestamp).toISOString().slice(11, 16);
    let messageTimestamp = `${messageTimestampDate} ${messageTimestampTime}`;

    let reactionsArr = Object.values(message.reactions);

    let [messageId, userId] = [message.id, user.id]
    let props = {messageId, userId}

    return (
        <div className='message-item'>
            <div className='message-left-and-center'>
                <div className='message-left-side'>
                    <img className='message-profile-pic' src={`${user.prof_pic}`} alt={`${user.username.slice(0, -5)} Profile Pic`} />
                </div>
                <div className='message-center'>
                    <div className='message-sender'>
                        <p className='message-username'>{user.username.slice(0, -5)}</p>
                        <p className='message-timestamp'>{messageTimestamp}</p>
                    </div>
                    <div className="message-content">
                        <p>{message.content}</p>
                    </div>
                    <div className='reactions-container'>
                    {reactionsArr.map((reaction) => {
                        return (
                            <div key={`${reaction.id}`} className='messageitem-reactiondiv'>
                                <p className='emojis-emojichar'> {String.fromCodePoint(reaction.emojiId)}</p>
                                {/* need to make this dynamically count */}
                                <p className='emojis-count'> 1 </p>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
            <div className='message-right-side'>
                <EmojisModal props={props}/>
            </div>
        </div>
    );
};

export default MessageItem;
