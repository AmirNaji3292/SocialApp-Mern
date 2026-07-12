import { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { baseUrl } from '../utils/baseUrl';
import { toast } from 'react-toastify';
import { PostContext } from './PostContext';

export const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
	const { axiosJwt, token } = useContext(AuthContext);
    const {detailPost}=useContext(PostContext)

	const createComment = async (data) => {
		try {
			const res = await axiosJwt.post(`${baseUrl}/api/cratecomment`, data, {
				headers: {
					authorization: `Bearer ${token}`
				}
			});
            detailPost(data.postId)
			toast(res.data, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});
		} catch (error) {
			console.log(error);
		}
	};

	// delete comment
	const deleteComment = async (data) => {
		try {
			const res = await axiosJwt.delete(`${baseUrl}/api/deletecomment/${data.commentId}`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            });
            detailPost(data.postId)

            toast(res.data, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});

		} catch (error) {
			console.log(error);
		}
	};


    // update comment
    const updateComment = async(data) => {
        const id=data.commentId
		
        try {
             const res =await axiosJwt.put(`${baseUrl}/api/updatecomment/${id}}`, data, {
                  headers: {
                       authorization: `Bearer ${token}`
                  }
             })
             detailPost(data.postId)
             toast(res.data, {
				position: 'bottom-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark'
			});
           

        } catch (error) {
             console.log(error);
        }
     
   }


	return <CommentContext.Provider 
    value={{ updateComment,createComment,deleteComment }}>
        {children}
        </CommentContext.Provider>;
};
