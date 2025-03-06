import React, { useEffect, useState } from "react";
import "./PatientSignupForm.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { IoBody } from "react-icons/io5";
import { IonDatetime, IonModal, IonRippleEffect, IonToast, useIonAlert, useIonRouter } from "@ionic/react";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import axios from "axios";
import decrypt from "../../helper";
import { useHistory } from "react-router";
import { RadioButton } from "primereact/radiobutton";

const PatientSignupForm = () => {
  const history = useHistory();
  const [formPage, setFormPage] = useState(1);
  const [direction, setDirection] = useState("next"); // Tracks slide direction
  const steps = [1, 2, 3, 4]; // Define steps for the form

  const handleNextPage = () => {
    if (formPage < steps.length) {
      setDirection("next");
      setFormPage(formPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (formPage > 1) {
      setDirection("prev");
      setFormPage(formPage - 1);
    }
  };

  const genderOpt: string[] = ["Male", "Female", "Transgender"];
  const refMaritalStatus: string[] = ["Married", "Unmarried"];
  const educationOpt: string[] = [
    "Illiteracy",
    "Primary School",
    "Middle",
    "Higher Secondary",
    "Undergraduate (UG)",
    "Postgraduate (PG)",
  ];
  const occupationcategoryOtp: string[] = [
    "Professional",
    "Semi- Professional",
    "Clerical, Shop-Owner, Farmer",
    "Skilled worker",
    "Semi-skilled worker",
    "Unskilled worker",
    "Homemaker",
    "Unemployed",
    "Student",
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (e: any, field: string) => {
    const selectedValue = e.value;
    setFormData({
      ...formData,
      [field]: selectedValue,
    });
  };

  const [formData, setFormData] = useState({
    refUserFname: "",
    refUserLname: "",
    refUserEmail: "",
    refUserPassword: "",
    refUserConPassword: "",
    refGender: null as string | null,
    refMaritalStatus: null as string | null,
    refDOB: null as any | null,
    refEducation: "",
    refProfession: "",
    refSector: "",
    refAddress: "",
    refDistrict: "",
    refPincode: null as any | null,
    refUserMobileno: "",
  });

   interface ToastState {
      status: boolean;
      message: string;
      textColor?: string; // Optional textColor
    }
  
    const [toastOpen, setToastOpen] = useState<ToastState>({
      status: false,
      message: "",
    });


  const verifyForm1 = () => {
    if (formData.refUserFname.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid First Name" });
      return false;
    } else if (formData.refUserLname.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Last Name" });
      return false;
    } else if (!formData.refGender) {
      setToastOpen({ status: true, textColor: "red", message: "Select Gender" });
      return false;
    } else if (!formData.refDOB) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Date of Birth" });
      return false;
    } else if (!formData.refMaritalStatus) {
      setToastOpen({ status: true, textColor: "red", message: "Select Marital Status" });
      return false;
    }
    return true;
  };

  const verifyForm2 = () => {
    if (formData.refEducation.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Education" });
      return false;
    } else if (formData.refProfession.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Select Occupation Category" });
      return false;
    } else if (formData.refSector.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Sector" });
      return false;
    }
    return true;
  };

  const verifyForm3 = () => {
    if (formData.refAddress.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Address" });
      return false;
    } else if (formData.refDistrict.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter District" });
      return false;
    } else if (formData.refPincode.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Pincode" });
      return false;
    }
    return true;
  };

  const verifyForm4 = () => {
    if (
      !/^[6-9][0-9]{9}$/.test(formData.refUserMobileno)
    ) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Mobile Number" });
      return false;
    } else if (
      formData.refUserPassword.length === 0 || // Check if password is empty
      !/[a-zA-Z]/.test(formData.refUserPassword) || // Must contain at least one letter
      !/\d/.test(formData.refUserPassword) || // Must contain at least one digit
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.refUserPassword) || // Must contain at least one special character
      formData.refUserPassword.length < 8 || // Must be at least 8 characters long
      formData.refUserPassword !== formData.refUserConPassword
    ) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Valid Password" });
      return false;
    }
    return true;
  };

  const [occupationModel, setOccupationModel] = useState(false);

  const [occupationData, setOccupationData] = useState([
    {
      category: "Professional",
      heading: "Top level management of any organisation",
      content:
        "Example: Directors, Managers, advisory board members, consultants etc",
    },
    {
      category: "Semi Professional",
      heading: "Mid level management of any organisation",
      content:
        "Example: Assistant directors, Assistant managers, assistant engineers, junior consultant doctors etc",
    },
    {
      category: "Clerical shop owners, land lords",
      heading: "",
      content: "who are involved in accounting and supervisors, desk top work",
    },
    {
      category: "Skilled workers",
      heading: "Technicians with a degree certificate related to the work",
      content:
        "Tailor, mason, carpenter, Electrician, plumber, factory machine operator",
    },
    {
      category: "Semi skilled workers",
      heading: "Technicians without degree certificate related to the work",
      content:
        "Technicians with a degree certificate related to the work Tailor, mason, carpenter, Electrician, plumber, factory machine operator",
    },
    {
      category: "Unskilled worker",
      heading: "Helpers",
      content:
        "sweepers, gardeners, helpers in construction site, house keeping, office unskilled assistants etc",
    },
    {
      category: "Home makers",
      heading: "",
      content: "Family member who are involved in domestic chores of a family",
    },
    {
      category: "Unemployed",
      heading: "",
      content: "Those who are not employed in any of the organisation",
    },
    {
      category: "Student",
      heading: "",
      content:
        "Those who are involved in learning activity and not employed in any organisation.",
    },
  ]);

  const [occupationalSector, setOccupationalSector] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSigup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/postNewSignup`,
        {
          refUserFname: formData.refUserFname,
          refUserLname: formData.refUserLname,
          refUserEmail: formData.refUserEmail,
          refUserPassword: formData.refUserPassword,
          refDOB: formData.refDOB,
          refMaritalStatus: formData.refMaritalStatus,
          refEducation: formData.refEducation,
          refProfession: formData.refProfession,
          refSector: formData.refSector,
          refAddress: formData.refAddress,
          refDistrict: formData.refDistrict,
          refPincode: formData.refPincode,
          refUserMobileno: formData.refUserMobileno,
          refGender: formData.refGender,
        }
      );
      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.status) {
        setToastOpen({
          status: true,
          textColor: "green",
          message: "Successfully Signup",
        });

        setTimeout(() => {
          history.push("/enroll", {
            direction: "backward",
            animation: "slide",
          });

          setFormData({
            refUserFname: "",
            refUserLname: "",
            refUserEmail: "",
            refUserPassword: "",
            refUserConPassword: "",
            refGender: null as string | null,
            refMaritalStatus: null as string | null,
            refDOB: null as any | null,
            refEducation: "",
            refProfession: "",
            refSector: "",
            refAddress: "",
            refDistrict: "",
            refPincode: null as any | null,
            refUserMobileno: "",
          });
        }, 3000);
      } else {
        setLoading(false);
        setToastOpen({
          status: true,
          message: "Already Mobile Number Exits",
        });
      }
    } catch {
      console.error("tesitng - false");
    }
  };

  const [presentAlert] = useIonAlert();
    const router: any = useIonRouter();
  
    useEffect(() => {
      const handleBack = (event: PopStateEvent) => {
        event.preventDefault(); // Stop the default back behavior
        presentAlert({
          header: 'Confirm Exit',
          message: 'Are you sure you want to go back?',
          buttons: [
            {
              text: 'Yes',
              role: 'confirm',
              handler: () => {
                // Allow back navigation
                history.goBack();
              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                // Do nothing, stay on the page
                window.history.pushState(null, '', window.location.href);
              }
            }
          ]
        });
      };
   
      // Prevent back only if the user is on the signup page
    if (location.pathname === "/patientSignUp") {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBack);
    }

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
    }, [router, presentAlert]);

  return (
    <div className="ion-padding">
      {/* Occupation Model */}
      <IonModal
        isOpen={occupationModel}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => {
          setOccupationModel(false);
        }}
        animated={false}
      >
        <div className="doctor-modal-content">
          {/* Header */}
          <div className="doctor-modal-header">Occupation Category</div>

          {/* Content */}
          <div
            style={{ marginBottom: "10px", overflow: "auto", height: "50vh" }}
          >
            <table className="table custom-table">
              <thead>
                <tr>
                  <th
                    style={{ width: "40%", fontSize: "1rem" }}
                    className="table-heading"
                  >
                    Occupational Category
                  </th>
                  <th
                    style={{ width: "60%", fontSize: "1rem" }}
                    className="table-heading"
                  >
                    Definition with example
                  </th>
                </tr>
              </thead>
              <tbody>
                {occupationData.map((element: any) => (
                  <tr>
                    <td align="center">{element.category}</td>
                    <td style={{ fontSize: "0.9rem" }}>
                      <div>
                        <b>{element.heading}</b>
                      </div>
                      <div style={{ marginTop: "5px" }}>{element.content}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Close Button */}
          <button
            className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
            onClick={() => {
              setOccupationModel(false);
            }}
          >
            <IonRippleEffect></IonRippleEffect>
            Close
          </button>
        </div>
      </IonModal>

      {/* Occupational Sector */}
      <IonModal
        isOpen={occupationalSector}
        id="doctorDetailsGraph"
        initialBreakpoint={1}
        onDidDismiss={() => {
          setOccupationalSector(false);
        }}
        animated={false}
      >
        <div className="doctor-modal-content">
          {/* Header */}
          <div className="doctor-modal-header">Occupation Sector</div>

          {/* Content */}
          <div
            style={{ marginBottom: "10px", overflow: "auto", height: "50vh" }}
            className="ion-padding"
          >
            <div>
              <b>Production and Manufacturing</b>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <li>Agriculture and fishing</li>
              <li>Mining and Quarrying</li>
              <li>Forestry</li>
              <li>Food processing</li>
              <li>Factories and industries</li>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  marginTop: "5px",
                  paddingLeft: "10px",
                }}
              >
                <li>Textiles</li>
                <li>Automobiles</li>
                <li>Electrical and electronics</li>
                <li>Mechanical</li>
                <li>Constructions</li>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <b>Service sectors</b>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <li>Health care</li>
              <li>Education</li>
              <li>Sales and marketing</li>
              <li>IT and software solutions</li>
              <li>Finance and banking</li>
              <li>Transport and logistics- road and railways</li>
              <li>Hotels and lodges</li>
              <li>Media</li>
              <li>Judicial</li>
              <li>Defence and police</li>
              <li>Disaster management and rescue</li>
            </div>
            <div style={{ marginTop: "10px" }}>
              <b>Others</b>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <li>Research and development</li>
              <li>Consultancy</li>
              <li>Advisories</li>
              <li>Intelligence</li>
            </div>
          </div>

          {/* Close Button */}
          <button
            className="doctor-modal-close-btn ion-activatable ripple-parent rectangle"
            onClick={() => {
              setOccupationalSector(false);
            }}
          >
            <IonRippleEffect></IonRippleEffect>
            Close
          </button>
        </div>
      </IonModal>

      <div>
        <div style={{ padding: "0px 15px" }}>
          <IonToast
            style={{
              "--color": toastOpen.textColor || "black",
              fontWeight: "bold",
            }}
            isOpen={toastOpen.status}
            onDidDismiss={() =>
              setToastOpen({ status: false, textColor: "", message: "" })
            }
            message={toastOpen.message}
            duration={3000}
          />
          {formPage === 1 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  0%
                </div>
                <div>Complete</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                Personal Details
              </div>
            </>
          ) : formPage === 2 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  25%
                </div>
                <div>Complete</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                Skills Details
              </div>
            </>
          ) : formPage === 3 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  50%
                </div>
                <div>Complete</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                Communication Details
              </div>
            </>
          ) : formPage === 4 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  paddingTop: "0px",
                  paddingBottom: "5px",
                  color: "#45474b",
                }}
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                >
                  75%
                </div>
                <div>Complete</div>
              </div>

              <div
                style={{
                  fontSize: "1.3rem",
                  paddingRight: "5px",
                  fontWeight: "700",
                  paddingBottom: "20px",
                  color: "#45474b",
                }}
              >
                Authentication Detail
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Progress Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "0px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step}
              style={{
                width: "20%",
                height: "4px",
                background: formPage >= step ? "#1c70b0" : "#9e9e9e",
                borderRadius: "4px",
                transition: "background 0.5s ease-in-out",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-page">
        {formPage === 1 && (
          <div style={{ padding: "15px" }}>
            {/* First Name */}
            <div className="inputBox">
              <label>
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-user "></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refUserFname}
                  onChange={handleInputChange}
                  placeholder="Enter First Name"
                  name="refUserFname"
                />
              </div>
            </div>
            {/* Last Name */}
            <div className="inputBox">
              <label>
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refUserLname}
                  onChange={handleInputChange}
                  placeholder="Enter Last Name"
                  name="refUserLname"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="inputBox">
              <label>
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <div style={{ width: "100%", paddingLeft: "1rem" }}>
                {genderOpt.map((category, index) => {
                  return (
                    <div key={index} className="flex">
                      <RadioButton
                        inputId={category}
                        name="category"
                        value={category}
                        onChange={(e) => handleDropdownChange(e, "refGender")}
                        checked={formData.refGender === category}
                      />
                      <label htmlFor={category} className="ml-2">
                        {category}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gender */}
            {/* <div className="inputBox">
              <label>
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="addFamilyInputField gradientBackground02_opacity"
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-mars"></i>
                </span>
                <Dropdown
                  value={formData.refGender}
                  onChange={(e) => handleDropdownChange(e, "refGender")}
                  options={genderOpt}
                  style={{ textAlign: "left" }}
                  placeholder="Select Gender"
                  name="refGender"
                  className="addFamilyDropdown"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div> */}
            {/* Date of Birth */}
            <div className="inputBox">
              <label>
                Date of Birth <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-calendar "></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refDOB ? formData.refDOB.split("T")[0] : ""}
                  placeholder="Date of Birth"
                  name="refDOB"
                  onClick={openModal}
                />
              </div>
            </div>

            <IonModal
              isOpen={isOpen}
              id="doctorDetailsGraph"
              initialBreakpoint={1}
              onDidDismiss={closeModal}
              animated={false}
            >
              <div style={{ width: "100%", background: "#effafe" }}>
                <IonDatetime
                  presentation="date"
                  preferWheel={true}
                  value={formData.refDOB}
                  onIonChange={(e) => {
                    const selectedDate = e.detail.value;
                    setFormData({
                      ...formData,
                      refDOB: selectedDate,
                    });
                  }}
                ></IonDatetime>
                <Divider />
                <div
                  style={{
                    background: "#effafe",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    onClick={() => {
                      setFormData({
                        ...formData,
                        refDOB: "",
                      });
                      closeModal();
                    }}
                    style={{
                      width: "40%",
                      background: "#ceebfb",
                      padding: "15px",
                      textAlign: "center",
                      fontSize: "1.1rem",
                      color: "#0c3f69",
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Clear
                  </div>
                  <div
                    onClick={closeModal}
                    style={{
                      width: "40%",
                      background:
                        "linear-gradient(27deg, rgba(16, 148, 231, 1) 0%, rgba(7, 117, 197, 1) 100%)",
                      padding: "15px",
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "#fff",
                      borderRadius: "10px",
                      fontWeight: "700",
                    }}
                  >
                    Set
                  </div>
                </div>
              </div>
            </IonModal>

            {/* Marital Status */}
            {/* <div className="inputBox">
              <label>
                Marital Status <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="addFamilyInputField gradientBackground02_opacity"
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-users"></i>
                </span>
                <Dropdown
                  value={formData.refMaritalStatus}
                  style={{ textAlign: "left" }}
                  onChange={(e) => handleDropdownChange(e, "refMaritalStatus")}
                  options={refMaritalStatus}
                  placeholder="Select Marital Status"
                  name="refGender"
                  className="addFamilyDropdown"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div> */}

            {/* Marital Status */}
            <div className="inputBox">
              <label>
                Marital Status <span style={{ color: "red" }}>*</span>
              </label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {refMaritalStatus.map((category, index) => {
                  return (
                    <div key={index} className="flex">
                      <RadioButton
                        inputId={category}
                        name="category"
                        value={category}
                        onChange={(e) =>
                          handleDropdownChange(e, "refMaritalStatus")
                        }
                        checked={formData.refMaritalStatus === category}
                      />
                      <label htmlFor={category} className="ml-2">
                        {category}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {formPage === 2 && (
          <div style={{ padding: "15px" }}>
            {/* Education */}
            <div className="inputBox">
              <label>
                Education <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="addFamilyInputField gradientBackground02_opacity"
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-graduation-cap"></i>
                </span>
                <Dropdown
                  value={formData.refEducation}
                  name="educationOpt"
                  style={{ textAlign: "left" }}
                  onChange={(e) => handleDropdownChange(e, "refEducation")}
                  options={educationOpt}
                  optionLabel="name"
                  placeholder="Select Education"
                  className="addFamilyDropdown"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
            {/* Occupation */}
            <div className="inputBox">
              <label>
                Occupation <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="addFamilyInputField gradientBackground02_opacity"
                style={{ width: "100%" }}
              >
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-briefcase"></i>
                </span>
                <Dropdown
                  value={formData.refProfession}
                  style={{ textAlign: "left" }}
                  name="refProfession"
                  onChange={(e) => handleDropdownChange(e, "refProfession")}
                  options={occupationcategoryOtp}
                  optionLabel="name"
                  placeholder="Occupation Category"
                  className="addFamilyDropdown"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
              <label
                onClick={() => {
                  setOccupationModel(true);
                }}
                style={{ marginTop: "10px", textDecoration: "underline" }}
              >
                Example
              </label>
            </div>
            {/* Sector */}
            <div className="inputBox">
              <label>
                Sector <span style={{ color: "red" }}>*</span>
              </label>
              <div
                className="addFamilyInputField gradientBackground02_opacity"
                style={{ width: "100%" }}
              >
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span> */}
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refSector}
                  onChange={handleInputChange}
                  placeholder="Enter Sector"
                  name="refSector"
                />
              </div>
              <label
                onClick={() => {
                  setOccupationalSector(true);
                }}
                style={{ marginTop: "10px", textDecoration: "underline" }}
              >
                Example
              </label>
            </div>
          </div>
        )}
        {formPage === 3 && (
          <div style={{ padding: "15px" }}>
            {/* Education */}
            <div className="inputBox">
              <label>Email</label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-envelope"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refUserEmail}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  name="refUserEmail"
                />
              </div>
            </div>
            {/* Address */}
            <div className="inputBox">
              <label>
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refAddress}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  name="refAddress"
                />
              </div>
            </div>
            {/* District */}
            <div className="inputBox">
              <label>
                District <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  value={formData.refDistrict}
                  onChange={handleInputChange}
                  placeholder="Enter District"
                  name="refDistrict"
                />
              </div>
            </div>
            {/* Pincode */}
            <div className="inputBox">
              <label>
                Pincode <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <span className="addFamilyInputField_Icon">
                  <i className="pi pi-map-marker"></i>
                </span>
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  type="number"
                  value={formData.refPincode}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    if (inputValue.length <= 6) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={6}
                  placeholder="Enter Pincode"
                  name="refPincode"
                />
              </div>
            </div>
          </div>
        )}
        {formPage === 4 && (
          <div style={{ padding: "15px" }}>
            {/* Mobile Number */}
            <div className="inputBox">
              <label>
                Mobile Number <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                {/* <span className="p-inputgroup-addon">
                                        <i className="pi pi-envelope"></i>
                                      </span> */}
                <InputText
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  type="number"
                  value={formData.refUserMobileno}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      handleInputChange(e);
                    }
                  }}
                  maxLength={10} // Ensures max length of 10
                  placeholder="Enter Mobile Number"
                  name="refUserMobileno"
                />
              </div>
            </div>
            {/* Password */}
            <div className="inputBox">
              <label>
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <Password
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  value={formData.refUserPassword}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  name="refUserPassword"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>

            <div
              className="inputBox"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontWeight: "600",
              }}
            >
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
                {/[a-zA-Z]/.test(formData.refUserPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Character
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
                {/\d/.test(formData.refUserPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Number
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
                {/[!@#$%^&*(),.?":{}|<>]/.test(formData.refUserPassword) ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Atleast One Special Character
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
                {formData.refUserPassword.length > 7 ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp; Minimum 8 Characters
              </div>
            </div>

            {/* Confirm Password */}
            <div className="inputBox">
              <label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                <Password
                  style={{ width: "100%", textAlign: "left" }}
                  className="addFamilyInputText"
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  value={formData.refUserConPassword}
                  onChange={handleInputChange}
                  placeholder="Enter Confirm Password"
                  name="refUserConPassword"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>

            <div
              className="inputBox"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontWeight: "600",
              }}
            >
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
                {formData.refUserPassword === formData.refUserConPassword &&
                formData.refUserPassword.length > 0 ? (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-check"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      background: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <i
                      style={{ fontSize: "15px", color: "#fff" }}
                      className="pi pi-times"
                    ></i>
                  </div>
                )}
                &nbsp;Match Confirm Password
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          textAlign: "center",
          margin: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {formPage === 1 ? (
          <div></div>
        ) : (
          <button
            className="sidnupbtn"
            onClick={handlePreviousPage}
            disabled={formPage === 1}
            style={{ marginRight: "10px" }}
          >
            <i className="pi pi-arrow-left"></i>
          </button>
        )}
        {formPage === 4 ? (
          <>
            {loading ? (
              <button className="submitbtn">
                <i className="pi pi-spin pi-spinner"></i>
              </button>
            ) : (
              <button
                className="submitbtn"
                onClick={() => {
                  if (formPage === 4) {
                    if (verifyForm4()) {
                      setLoading(true);
                      handleSigup();
                      console.log("SignUp Success");
                    }
                  }
                }}
              >
                Sign Up
              </button>
            )}
          </>
        ) : (
          <button
            className="sidnupbtn"
            onClick={() => {
              if (formPage === 1) {
                if (verifyForm1()) {
                  handleNextPage();
                }
              } else if (formPage === 2) {
                if (verifyForm2()) {
                  handleNextPage();
                }
              } else if (formPage === 3) {
                if (verifyForm3()) {
                  handleNextPage();
                }
              }
            }}
            disabled={formPage === steps.length}
          >
            <i className="pi pi-arrow-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientSignupForm;
