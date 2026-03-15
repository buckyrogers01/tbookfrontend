import { useForm } from "react-hook-form";
import "./profile.css";

type ProfileForm = {
  name: string;
  email: string;
  phone: string;
};

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "Admin User",
      email: "admin@travo.com",
      phone: "9876543210",
    },
  });

  const passwordForm = useForm<PasswordForm>();

  const onProfileSubmit = (data: ProfileForm) => {
    console.log(data);
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    console.log(data);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">

        <div className="profile-avatar">
          A
        </div>

        <div>
          <h2>Admin Profile</h2>
          <p>Manage your account information</p>
        </div>

      </div>

      <div className="profile-grid">

        {/* Profile Card */}

        <form
          onSubmit={handleSubmit(onProfileSubmit)}
          className="profile-card"
        >
          <h3>Profile Information</h3>

          <div className="profile-field">
            <label>Name</label>
            <input {...register("name", { required: true })} />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input disabled {...register("email")} />
          </div>

          <div className="profile-field">
            <label>Phone</label>
            <input {...register("phone", { required: true })} />
          </div>

          <button className="profile-btn">
            Update Profile
          </button>

        </form>

        {/* Password Card */}

        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="profile-card"
        >

          <h3>Change Password</h3>

          <div className="profile-field">
            <label>Old Password</label>
            <input
              type="password"
              {...passwordForm.register("oldPassword", { required: true })}
            />
          </div>

          <div className="profile-field">
            <label>New Password</label>
            <input
              type="password"
              {...passwordForm.register("newPassword", { required: true })}
            />
          </div>

          <div className="profile-field">
            <label>Confirm Password</label>
            <input
              type="password"
              {...passwordForm.register("confirmPassword", { required: true })}
            />
          </div>

          <button className="profile-btn">
            Change Password
          </button>

        </form>

      </div>
    </div>
  );
}