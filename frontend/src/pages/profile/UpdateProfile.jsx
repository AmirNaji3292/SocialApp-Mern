import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const formSchema = Yup.object({
	firstName: Yup.string().required('Required firstName'),
    lastName:Yup.string().required('required lastName'),
    bio:Yup.string().required('required bio'),
});

function UpdateProfile() {
    const{UpdateProfile}=useContext(AuthContext)
    const {state}=useLocation()

	const formik = useFormik({
		initialValues: {
			firstName: state.firstName,
            lastName:state.lastName,
            bio:state.bio
		},
		onSubmit: (values) => {
			UpdateProfile(values);
		},
		validationSchema: formSchema
	});

	return (
		<div className="container bg-sky-700 p-5 h-[100vh]">
			<Navbar />

			<div className="columns is-justify-content-center">
				<div className="column is-two-thirds">
					<form onSubmit={formik.handleSubmit} className="mt-6">
						<div className="field">
							<div className="control">
								<input
									type="text"
									className="input"
									placeholder="firstName"
									defaultValue={state.firstName}
									onChange={formik.handleChange('firstName')}
									onBlur={formik.handleBlur('firstName')}
								/>
							</div>
							<p className="help is-danger">{formik.touched.firstName && formik.errors.firstName}</p>
						</div>


                        <div className="field">
							<div className="control">
								<input
									type="text"
									className="input"
									placeholder="lastName"
									defaultValue={state.lastName}
									onChange={formik.handleChange('lastName')}
									onBlur={formik.handleBlur('lastName')}
								/>
							</div>
							<p className="help is-danger">{formik.touched.lastName && formik.errors.lastName}</p>
						</div>


                        <div className="field">
							<div className="control">
								<textarea
									type="text"
									className="textarea"
									placeholder="bio"
									defaultValue={state.bio}
									onChange={formik.handleChange('bio')}
									onBlur={formik.handleBlur('bio')}
								/>
							</div>
							<p className="help is-danger">{formik.touched.bio && formik.errors.bio}</p>
						</div>

						<div className="field mt-6">
							<div className="control">
								<button type="submit" className="button is-link has-text-weight-bold is-fullwidth">
									{' '}
									Edit Profile
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default UpdateProfile;
