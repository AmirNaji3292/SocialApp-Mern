
export const blockUser=(user)=>{
    if(user.isBlocked){
        throw new Error('You Are Blocked And Cant Send Post')
    }
}