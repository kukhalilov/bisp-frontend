import { useEffect, useState } from "react";
import "../styles/profile.css";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import User from "../interfaces/User";
import { getData, putData } from "../api/api";
import { RootState } from "../redux/store";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface FormDetails {
  pic?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string | number;
  mobile: string | number;
  gender: string;
  address: string;
  password?: string;
  confpassword?: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);
  const user = useSelector((state: RootState) => state.root.userInfo);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState<FormDetails>({
    pic: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
  });

  const getUser = async () => {
    if (user) {
      try {
        dispatch(setLoading(true));
        const temp = await getData<User>(`/users/${user?._id}`);
        setFormDetails({
          ...temp,
          mobile: temp.mobile ? temp.mobile : "",
          age: temp.age ? temp.age : "",
          gender: temp.gender ? temp.gender : "",
          address: temp.address ? temp.address : "",
        });
        setFile(temp.pic);
        dispatch(setLoading(false));
      } catch (error) {}
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const inputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const storage = getStorage();

  const onUpload = async (element: File) => {
    setLoading(true);

    if (element.type === "image/jpeg" || element.type === "image/png") {
      try {
        const filename = `${Date.now()}_${element.name}`;
        const fileRef = ref(storage, filename);
        await uploadBytes(fileRef, element);

        const downloadURL = await getDownloadURL(fileRef);

        setFile(downloadURL);

        setLoading(false);

        return downloadURL;
      } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const {
        firstName,
        lastName,
        email,
        age,
        mobile,
        address,
        gender,
        password,
        confpassword,
      } = formDetails;

      if (!email) {
        return toast.error("Email should not be empty");
      } else if (firstName.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastName.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password && password.length > 0 && password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      const formElement = e.target as HTMLFormElement;
      const fileInput = formElement.elements.namedItem(
        "profile-pic"
      ) as HTMLInputElement;

      let pic: string | undefined;
      if (fileInput) {
        const actionedFile = fileInput.files?.[0];
        if (actionedFile) {
          pic = await onUpload(actionedFile);
        }
      }

      const profileData: FormDetails = {
        pic,
        firstName,
        lastName,
        age,
        mobile,
        address,
        gender,
        email,
      };

      if (password && password.length > 4) {
        profileData.password = password;
      }

      await toast.promise(
        putData(`/users/${user?._id}/update-profile`, profileData),
        {
          success: "Profile updated successfully",
          error: "Unable to update profile",
          loading: "Updating profile...",
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      return toast.error("Unable to update profile");
    }
  };

  return (
    <>
      <Navbar />

      <section className="container notifications-section">
        <div className="profile-container flex-center">
          <h2 className="form-heading">Profile</h2>
          {loading ? (
            <Loading />
          ) : (
            <>
              <img src={file} alt="profile" className="profile-pic" />
              <form onSubmit={formSubmit} className="register-form">
                <div className="form-same-row">
                  <input
                    type="file"
                    name="profile-pic"
                    id="profile-pic"
                    className="form-input"
                  />
                </div>
                <div className="form-same-row">
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="Enter your first name"
                    value={formDetails.firstName}
                    onChange={inputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Enter your last name"
                    value={formDetails.lastName}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-same-row">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={formDetails.email}
                    onChange={inputChange}
                  />
                  <select
                    name="gender"
                    value={formDetails.gender}
                    className="form-input"
                    id="gender"
                    onChange={inputChange}
                  >
                    <option value="neither">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-same-row">
                  <input
                    type="text"
                    name="age"
                    className="form-input"
                    placeholder="Enter your age"
                    value={formDetails.age}
                    onChange={inputChange}
                  />
                  <input
                    type="text"
                    name="mobile"
                    className="form-input"
                    placeholder="Enter your mobile number"
                    value={formDetails?.mobile}
                    onChange={inputChange}
                  />
                </div>
                <textarea
                  name="address"
                  className="form-input"
                  placeholder="Enter your address"
                  value={formDetails.address}
                  onChange={inputChange}
                  rows={2}
                ></textarea>
                <div className="form-same-row">
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={formDetails.password}
                    onChange={inputChange}
                  />
                  <input
                    type="password"
                    name="confpassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formDetails.confpassword}
                    onChange={inputChange}
                  />
                </div>
                <button type="submit" className="btn form-btn">
                  update
                </button>
              </form>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
