const TopicsTable = (props)=>{
    return (

        <table>
            <tbody>
                {props.topics.map(topic => {
                    return (
                        <tr key={topic._id} >
                            <td onDoubleClick={() => props.toggleCelebrated(topic)}
                                className={topic.celebrated
                                    ? 'celebrated'
                                    :
                                    null}> {topic.name}
                            </td>
                            <td>{topic.likes}</td>
                            <td onClick={() => props.addLike(topic)}>like</td>
                            <td onClick={() => props.deleteHoliday(topic._id)}>X</td>
                            <td onClick={() => props.showEditForm(topic)}>edit</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TopicsTable