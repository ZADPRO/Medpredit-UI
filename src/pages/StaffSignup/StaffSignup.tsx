import {
  IonBackButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import axios from "axios";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import React, {
  useEffect,
  useState,
} from "react";
import decrypt from "../../helper";
import { useHistory, useLocation } from "react-router";
import MonthYear from "../DateInput/MonthYear";
import { InputNumber } from "primereact/inputnumber";
import MonthYearPicker from "../DateInput/MonthYear";
import { MultiSelect } from "primereact/multiselect";
import Checkbox from "../Questions/Checkbox";
import { chevronBack } from "ionicons/icons";

interface WorkEntry {
  instituteName: string;
  department: string;
  designation: string;
  address: string;
  fromDate: string;
  toDate: string;
}

const StaffSignup = () => {
  const history = useHistory();

  const [otherMedical, setOtherMedical] = useState(false);
  const [otherMedicalName, setOtherMedicalName] = useState("");

  const [checkedAdmin, setCheckedAdmin] = useState<boolean>(false);

  useEffect(() => {
    console.log("====================================");
    console.log("--->", localStorage.getItem("createRoleId") === "1");
    console.log("====================================");
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/getUserList`,
            {
              roleId:
                localStorage.getItem("createRoleId") === "1"
                  ? "2"
                  : localStorage.getItem("createRoleId") === "2"
                    ? "1"
                    : localStorage.getItem("createRoleId") === "4"
                      ? "2"
                      : null,
              hospitalId: localStorage.getItem("hospitalId"),
            },
            {
              headers: {
                Authorization: token,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            const data = decrypt(
              response.data[1],
              response.data[0],
              import.meta.env.VITE_ENCRYPTION_KEY
            );

            if (data.status) {
              setUserList(data.userList);
              console.log("====================================");
              console.log(data.userList);
              console.log("====================================");
            }
          });
      } catch {
        console.error("tesitng - false");
      }
    } else {
      console.log("Token Invalid");
    }
  }, []);

  const [userList, setUserList] = useState([]);

  const [formPage, setFormPage] = useState(1);
  const [direction, setDirection] = useState("next"); // Tracks slide direction
  const steps = [1, 2, 3, 4, 5]; // Define steps for the form

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

    console.log(field);

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
    refAddress: "",
    refDistrict: "",
    refPincode: null as any | null,
    refUserMobileno: "",
    allopathic: "",
    education: "",
    educationSpecialization: "",
    superSpecialization: "",
    supSpecialization: "",
    additionalDegree: "",
    degreeType: "",
    degreeSpecialization: "",
    medicalCouncil: "",
    mciRegisteredNo: "",
    typeHealthcare: "",
    instituteType: "",
    nameInstitute: "",
    designation: "",
    department: "",
    instituteAddress: "",
    selectedUsers: [],
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
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid First Name",
      });
      return false;
    } else if (formData.refUserLname.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid Last Name",
      });
      return false;
    } else if (!formData.refGender) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Gender",
      });
      return false;
    } else if (!formData.refDOB) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Date of Birth",
      });
      return false;
    } else if (!formData.refMaritalStatus) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Marital Status",
      });
      return false;
    }
    return true;
  };

  const verifyForm2 = () => {
    if (formData.refUserEmail.length === 0) {
      setToastOpen({ status: true, textColor: "red", message: "Enter Email" });
      return false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.refUserEmail) &&
      formData.refUserEmail.length > 0
    ) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid Email",
      });
      return false;
    } else if (formData.refAddress.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Address",
      });
      return false;
    } else if (formData.refDistrict.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter District",
      });
      return false;
    } else if (formData.refPincode.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Pincode",
      });
      return false;
    }
    return true;
  };

  const verifyForm3 = () => {
    console.log("====================================", formData.medicalCouncil === "Others" && otherMedicalName.length === 0);
    console.log("====================================", formData.medicalCouncil);
    console.log("====================================", otherMedicalName);
    if (formData.allopathic.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Allopathic Health System",
      });
      return false;
    } else if (formData.education.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Education Qualification",
      });
      return false;
    } else if (formData.education === "UG") {
      if (formData.educationSpecialization.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Enter Education Qualification Specialization",
        });
        return false;
      } else if (formData.medicalCouncil.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Select Medical Council",
        });
        return false;
      } else if (formData.medicalCouncil === "Others" && otherMedicalName.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Enter the Name of Other Medical Council",
        });
        return false
      } else if (formData.mciRegisteredNo.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Enter MCI Number",
        });
        return false;
      }
    } else if (formData.education === "PG") {
      if (formData.educationSpecialization.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Enter Education Qualification Specialization",
        });
        return false;
      } else if (formData.superSpecialization.length === 0) {
        setToastOpen({
          status: true,
          textColor: "red",
          message: "Select Super Specialization",
        });
        return false;
      } else if (formData.superSpecialization === "Yes") {
        if (formData.supSpecialization.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Enter Specialization",
          });
          return false;
        } else if (formData.additionalDegree.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Select Additional Degree",
          });
          return false;
        } else if (formData.degreeType.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Select Degree Type",
          });
          return false;
        } else if (formData.degreeSpecialization.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Enter Specialization",
          });
          return false;
        } else if (formData.medicalCouncil.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Select Medical Council",
          });
          return false;
        } else if (formData.mciRegisteredNo.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Enter MCI Number",
          });
          return false;
        }
      } else if (formData.superSpecialization === "No") {
        // if (formData.additionalDegree.length === 0) {
        //   setToastOpen({
        //     status: true,
        //     message: "Select Additional Degree",
        //   });
        //   return false;
        // } else if (formData.degreeType.length === 0) {
        //   setToastOpen({
        //     status: true,
        //     message: "Select Degree Type",
        //   });
        //   return false;
        // } else if (formData.degreeSpecialization.length === 0) {
        //   setToastOpen({
        //     status: true,
        //     message: "Enter Specialization",
        //   });
        //   return false;
        // } else
        if (formData.medicalCouncil.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Select Medical Council",
          });
          return false;
        } else if (formData.medicalCouncil === "Others" && otherMedicalName.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Enter the Name of Medical Council",
          });
          return false
        } else if (formData.mciRegisteredNo.length === 0) {
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Enter MCI Number",
          });
          return false;
        }
      }
    }
    return true;
  };

  const verifyForm4 = () => {
    if (formData.typeHealthcare.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Healthcare System",
      });
      return false;
    } else if (formData.instituteType.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Institute",
      });
      return false;
    } else if (formData.nameInstitute.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Institute Name",
      });
      return false;
    } else if (formData.nameInstitute.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Institute Name",
      });
      return false;
    } else if (formData.designation.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Designation",
      });
      return false;
    } else if (formData.department.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Department",
      });
      return false;
    } else if (formData.instituteAddress.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Address",
      });
      return false;
    }
    return true;
  };

  const verifyForm5 = () => {
    console.log("====================================");
    console.log(!/^[6-9][0-9]{9}$/.test(formData.refUserMobileno));
    console.log("====================================");
    if (
      !/^[6-9][0-9]{9}$/.test(formData.refUserMobileno) ||
      formData.refUserMobileno.length === 0
    ) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid Mobile Number",
      });
      return false;
    } else if (
      formData.refUserPassword.length === 0 || // Check if password is empty
      !/[a-zA-Z]/.test(formData.refUserPassword) || // Must contain at least one letter
      !/\d/.test(formData.refUserPassword) || // Must contain at least one digit
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.refUserPassword) || // Must contain at least one special character
      formData.refUserPassword.length < 8 || // Must be at least 8 characters long
      formData.refUserPassword !== formData.refUserConPassword
    ) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Enter Valid Password",
      });
      return false;
    } else if (localStorage.getItem("createRoleId") === "2" && formData.selectedUsers.length === 0) {
      setToastOpen({
        status: true,
        textColor: "red",
        message: "Select Atleast One Doctors",
      });
      return false;
    }
    // else if (formData.selectedUsers.length === 0) {
    //   setToastOpen({
    //     status: true,
    //     message: `Select ${
    //       localStorage.getItem("createRoleId") === "1" || "4"
    //         ? "Assistants"
    //         : localStorage.getItem("createRoleId") === "2"
    //         ? "Doctors"
    //         : null
    //     }`,
    //   });
    //   return false;
    // }
    return true;
  };
  const [loading, setLoading] = useState(false);

  const allopathicOption = [
    {
      name: "allopathic",
      label: "Yes",
    },
    {
      name: "allopathic",
      label: "No",
    },
  ];

  const educationOption = [
    {
      name: "education",
      label: "UG",
    },
    {
      name: "education",
      label: "PG",
    },
  ];

  const superOption = [
    {
      name: "superSpecialization",
      label: "Yes",
    },
    {
      name: "superSpecialization",
      label: "No",
    },
  ];

  const degreeOptions = [
    {
      name: "additionalDegree",
      label: "Yes",
    },
    {
      name: "additionalDegree",
      label: "No",
    },
  ];

  const degreeTypeOption = [
    {
      name: "degreeType",
      label: "Diploma",
    },
    {
      name: "degreeType",
      label: "Fellowship",
    },
  ];

  const typeHealthcareOption = [
    {
      name: "typeHealthcare",
      label: "Private",
    },
    {
      name: "typeHealthcare",
      label: "Government",
    },
  ];

  const privateHospital = [
    {
      name: "instituteType",
      label: "Clinic",
    },
    {
      name: "instituteType",
      label: "Polylinic",
    },
    {
      name: "instituteType",
      label: "Hospital",
    },
    {
      name: "instituteType",
      label: "Multi Speciality Hospital",
    },
  ];

  const governmentHospital = [
    {
      name: "instituteType",
      label: "PHC",
    },
    {
      name: "instituteType",
      label: "CHC",
    },
    {
      name: "instituteType",
      label: "Sub-District Taluk Hospital",
    },
    {
      name: "instituteType",
      label: "District Headquarters Hospital",
    },
    {
      name: "instituteType",
      label: "Medical College Hospital",
    },
  ];

  const medicalCouncilOption = [
    "Andhra Pradesh Medical Council",
    "Arunachal Pradesh Medical Council",
    "Assam Medical Council",
    "Bihar Medical Council",
    "Chattisgarh Medical Council",
    "Delhi Medical Council",
    "Goa Medical Council",
    "Gujarat Medical Council",
    "Haryana Dental and Medical Council",
    "Himachal Pradesh Medical Council",
    "Jammu and Kashmir Medical Council",
    "Jharkhand Medical Council",
    "Karnataka Medical Council",
    "Madhya Pradesh Medical Council",
    "Maharashtra Medical Council",
    "Medical Council of India",
    "Nagaland Medical Council",
    "Orissa Council of Medical Registration",
    "Punjab Medical Council",
    "Rajasthan Medical Council",
    "Sikkim Medical Council",
    "TamilNadu Medical Council",
    "Travancore Medical Council",
    "Telangana Medical Council",
    "Tripura Medical Council",
    "Uttar Pradesh Medical Council",
    "Uttrakhand Medical Council",
    "West Bengal Medical Council",
  ];

  const medicalCouncilOptionAst = [
    "Andhra Pradesh Medical Council",
    "Arunachal Pradesh Medical Council",
    "Assam Medical Council",
    "Bihar Medical Council",
    "Chattisgarh Medical Council",
    "Delhi Medical Council",
    "Goa Medical Council",
    "Gujarat Medical Council",
    "Haryana Dental and Medical Council",
    "Himachal Pradesh Medical Council",
    "Jammu and Kashmir Medical Council",
    "Jharkhand Medical Council",
    "Karnataka Medical Council",
    "Madhya Pradesh Medical Council",
    "Maharashtra Medical Council",
    "Medical Council of India",
    "Nagaland Medical Council",
    "Orissa Council of Medical Registration",
    "Punjab Medical Council",
    "Rajasthan Medical Council",
    "Sikkim Medical Council",
    "TamilNadu Medical Council",
    "Travancore Medical Council",
    "Telangana Medical Council",
    "Tripura Medical Council",
    "Uttar Pradesh Medical Council",
    "Uttrakhand Medical Council",
    "West Bengal Medical Council",
    "Others"
  ];


  const [previousWork, setPreviousWork] = useState<WorkEntry[]>([]);

  // Handle input change
  const PrevhandleInputChange = (index: number, event: any) => {
    const { name, value } = event.target;

    setPreviousWork((prevWork) =>
      prevWork.map((work, i) =>
        i === index ? { ...work, [name as keyof WorkEntry]: value } : work
      )
    );
  };

  // Add a new set of inputs
  const addPreviousWork = () => {
    setPreviousWork([
      ...previousWork,
      {
        instituteName: "",
        department: "",
        designation: "",
        address: "",
        fromDate: "",
        toDate: "",
      },
    ]);
  };

  // Remove a set of inputs
  const removePreviousWork = (index: any) => {
    const updatedWork = previousWork.filter((_, i) => i !== index);
    setPreviousWork(updatedWork);
  };

  const handleSignup = async () => {
    const tokenString = localStorage.getItem("userDetails");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString);
        const token = tokenObject.token;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/signUpDoctors`,
          {
            refRoleId: localStorage.getItem("createRoleId"),
            refUserFname: formData.refUserFname,
            refUserLname: formData.refUserLname,
            refUserEmail: formData.refUserEmail,
            refUserPassword: formData.refUserPassword,
            refGender: formData.refGender,
            refMaritalStatus: formData.refMaritalStatus,
            refDOB: formData.refDOB,
            refAddress: formData.refAddress,
            refDistrict: formData.refDistrict,
            refPincode: formData.refPincode,
            refUserMobileno: formData.refUserMobileno,
            allopathic: formData.allopathic,
            education: formData.education,
            educationSpecialization: formData.educationSpecialization,
            superSpecialization: formData.superSpecialization,
            supSpecialization: formData.supSpecialization,
            additionalDegree: formData.additionalDegree,
            degreeType: formData.degreeType,
            degreeSpecialization: formData.degreeSpecialization,
            medicalCouncil: formData.medicalCouncil === "Others" ? otherMedicalName : formData.medicalCouncil,
            mciRegisteredNo: formData.mciRegisteredNo,
            typeHealthcare: formData.typeHealthcare,
            instituteType: formData.instituteType,
            nameInstitute: formData.nameInstitute,
            designation: formData.designation,
            department: formData.department,
            instituteAddress: formData.instituteAddress,
            previousWork: previousWork,
            hospitalId: localStorage.getItem("hospitalId"),
            selectedUsers: formData.selectedUsers,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
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
            if (
              localStorage.getItem("createRoleId") == "1" ||
              localStorage.getItem("createRoleId") == "4"
            ) {
              history.replace("/manageDoctor", {
                direction: "backward",
                animation: "slide",
              });
            } else if (localStorage.getItem("createRoleId") == "2") {
              history.replace("/manageAssistant", {
                direction: "backward",
                animation: "slide",
              });
            } else {
              history.replace("/patient", {
                direction: "backward",
                animation: "slide",
              });
            }
          }, 3000);
        } else {
          setLoading(false);
          setToastOpen({
            status: true,
            textColor: "red",
            message: "Already Mobile Number Exits",
          });
        }
      } catch {
        console.error("tesitng - false");
      }
    } else {
      console.log("Token Invalid");
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
    if (location.pathname === "/addDoctor") {
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handleBack);
    }

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router, presentAlert]);

  return (
    <IonPage>
      {/* <IonHeader mode="ios">
        <IonToolbar className="pt-1 pb-1" mode="ios">
          <IonButtons slot="start">
            <IonBackButton mode="md" defaultHref="/configure"></IonBackButton>
          </IonButtons>
          <IonTitle>
            {formPage === 1 ? (
              <>
                {localStorage.getItem("createRoleId") === "1"
                  ? "Add Doctor"
                  : localStorage.getItem("createRoleId") === "2"
                    ? "Add Assistant"
                    : localStorage.getItem("createRoleId") === "4"
                      ? "Add Doctor + Admin"
                      : null}
              </>
            ) : (
              formData.refUserFname + " " + formData.refUserLname
            )}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding"> */}
      <IonContent>
        <div
          className="KnowAboutPatient medpredit-page-background"
          style={{ height: "100vh" }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: "600",
              margin: "1rem 1rem 0 1rem",
            }}
          >
            <IonIcon
              size="large"
              onClick={() => {
                history.goBack();
              }}
              icon={chevronBack}
            ></IonIcon>
            <span
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              {formPage === 1 ? (
                <>
                  {localStorage.getItem("createRoleId") === "1"
                    ? "Add Doctor"
                    : localStorage.getItem("createRoleId") === "2"
                      ? "Add Assistant"
                      : localStorage.getItem("createRoleId") === "4"
                        ? "Add Doctor + Admin"
                        : null}
                </>
              ) : (
                formData.refUserFname + " " + formData.refUserLname
              )}
            </span>
            <span></span>
          </div>
          <div
            className="custom-scrollbar boxShadow02-inset"
            style={{ margin: "1rem 0px", height: "auto", overflowY: "scroll" }}
          >
            <div>
              <div style={{ padding: "1rem" }}>
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
                        20%
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
                        40%
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
                      Qualification Details
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
                        60%
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
                      Occupation Detail
                    </div>
                  </>
                ) : formPage === 5 ? (
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
                        80%
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
                      width: "15%",
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
                <div
                  className="addFamilyUserInputs"
                  style={{ padding: "15px", width: "100%" }}
                >
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
                    <div
                      className="addFamilyInputField gradientBackground02_opacity"
                      style={{ width: "100%" }}
                    >
                      <span className="addFamilyInputField_Icon">
                        <i className="pi pi-mars"></i>
                      </span>
                      <Dropdown
                        value={formData.refGender}
                        style={{ textAlign: "left" }}
                        onChange={(e) => handleDropdownChange(e, "refGender")}
                        options={genderOpt}
                        placeholder="Select Gender"
                        name="refGender"
                        className="addFamilyDropdown"
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                    </div>
                    {/* <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      <span className="addFamilyInputField_Icon">
                        <i className="pi pi-user"></i>
                      </span>
                      <Dropdown
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.refGender}
                        onChange={(e) => handleDropdownChange(e, "refGender")}
                        options={genderOpt}
                        placeholder="Select Gender"
                        name="refGender"
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                    </div> */}
                  </div>
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
                        value={
                          formData.refDOB ? formData.refDOB.split("T")[0] : ""
                        }
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
                  <div className="inputBox">
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
                        onChange={(e) =>
                          handleDropdownChange(e, "refMaritalStatus")
                        }
                        options={refMaritalStatus}
                        placeholder="Select Marital Status"
                        name="refGender"
                        className="addFamilyDropdown"
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                    </div>
                  </div>
                </div>
              )}
              {formPage === 2 && (
                <div style={{ padding: "15px" }}>
                  {/* Education */}
                  <div className="inputBox">
                    <label>
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
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
              {formPage === 3 && (
                <div style={{ padding: "15px" }}>
                  {/* Allopathic */}
                  <div className="questions multiInput">
                    <div className="inputBox">
                      <label>
                        Allopathic Health System{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="questionsbuttonGroup_01">
                      {allopathicOption?.map((option: any) => (
                        <button
                          className={`questionsTextOptions_01 ${formData.allopathic === option.label
                            ? "selected"
                            : ""
                            }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              allopathic: option.label,
                            });
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Education Qualification */}
                  <div
                    style={{ marginTop: "30px" }}
                    className="questions multiInput"
                  >
                    <div className="inputBox">
                      <label>
                        Educational Qualification{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="questionsbuttonGroup_01">
                      {educationOption?.map((option: any) => (
                        <button
                          className={`questionsTextOptions_01 ${formData.education === option.label
                            ? "selected"
                            : ""
                            }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              education: option.label,
                            });
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Specialization */}
                  <div className="inputBox">
                    <label>
                      Specialization <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                               <i className="pi pi-envelope"></i>
                             </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.educationSpecialization}
                        onChange={handleInputChange}
                        placeholder="Enter Specialization"
                        name="educationSpecialization"
                      />
                    </div>
                  </div>

                  {formData.education === "PG" ? (
                    <>
                      {/* Super Specialization */}
                      <div
                        style={{ marginTop: "30px" }}
                        className="questions multiInput"
                      >
                        <div className="inputBox">
                          <label>
                            Super Specialization{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>
                        <div className="questionsbuttonGroup_01">
                          {superOption?.map((option: any) => (
                            <button
                              className={`questionsTextOptions_01 ${formData.superSpecialization === option.label
                                ? "selected"
                                : ""
                                }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  superSpecialization: option.label,
                                });
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.superSpecialization === "Yes" ? (
                        <>
                          {/* Super Specialization */}
                          <div className="inputBox">
                            <label>
                              Specialization{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                              {/* <span className="p-inputgroup-addon">
                               <i className="pi pi-envelope"></i>
                             </span> */}
                              <InputText
                                style={{ width: "100%", textAlign: "left" }}
                                className="addFamilyInputText"
                                value={formData.supSpecialization}
                                onChange={handleInputChange}
                                placeholder="Enter Specialization"
                                name="supSpecialization"
                              />
                            </div>
                          </div>
                        </>
                      ) : null}

                      {/* Additional Degree */}
                      <div
                        style={{ marginTop: "30px" }}
                        className="questions multiInput"
                      >
                        <div className="inputBox">
                          <label>
                            Additional Degree{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>
                        <div className="questionsbuttonGroup_01">
                          {degreeOptions?.map((option: any) => (
                            <button
                              className={`questionsTextOptions_01 ${formData.additionalDegree === option.label
                                ? "selected"
                                : ""
                                }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  additionalDegree: option.label,
                                });
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.additionalDegree === "Yes" ? (
                        <>
                          {/* Degree Type */}
                          <div
                            style={{ marginTop: "30px" }}
                            className="questions multiInput"
                          >
                            <div className="inputBox">
                              <label>
                                Degress Type{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                            </div>
                            <div className="questionsbuttonGroup_01">
                              {degreeTypeOption?.map((option: any) => (
                                <button
                                  className={`questionsTextOptions_01 ${formData.degreeType === option.label
                                    ? "selected"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      degreeType: option.label,
                                    });
                                  }}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          {/* Super Specialization */}
                          <div className="inputBox">
                            <label>
                              Specialization{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div
                              className="addFamilyInputField gradientBackground02_opacity"
                              style={{ width: "100%" }}
                            >
                              {/* <span className="p-inputgroup-addon">
                               <i className="pi pi-envelope"></i>
                             </span> */}
                              <InputText
                                style={{ width: "100%", textAlign: "left" }}
                                className="addFamilyInputText"
                                value={formData.degreeSpecialization}
                                onChange={handleInputChange}
                                placeholder="Enter Specialization"
                                name="degreeSpecialization"
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* Medical Council */}

                  {
                    localStorage.getItem("createRoleId") === "2" ? (<>
                      <div className="inputBox">
                        <label>
                          Name of Registered Medical Council{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="card flex flex-column md:flex-row gap-1 mb-1 w-full">
                          <div
                            className="addFamilyInputField gradientBackground02_opacity"
                            style={{ width: "100%" }}
                          >
                            <Dropdown
                              value={formData.medicalCouncil}
                              onChange={(e) => {

                                if (e.value === "Others") {

                                  setOtherMedical(true)
                                } else {
                                  setOtherMedical(false)
                                }
                                handleDropdownChange(e, "medicalCouncil")
                              }}
                              options={medicalCouncilOptionAst}
                              placeholder="Select Medical Council"
                              name="medicalCouncil"
                              className="addFamilyDropdown"
                              checkmark={true}
                              highlightOnSelect={false}
                            />
                          </div>
                        </div>
                      </div>
                      {
                        otherMedical && (
                          <div className="inputBox">
                            <label>
                              Enter Other Registered Medical Council{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="card flex flex-column md:flex-row gap-1 mb-1 w-full">
                              <div
                                className="addFamilyInputField gradientBackground02_opacity"
                                style={{ width: "100%" }}
                              >
                                <InputText
                                  style={{ width: "100%", textAlign: "left" }}
                                  className="addFamilyInputText"
                                  value={otherMedicalName}
                                  onChange={(e: any) => {
                                    setOtherMedicalName(e.target.value)
                                  }}
                                  placeholder="Enter Other Registered Medical Council"
                                  name="degreeSpecialization"
                                />
                                {/* <Dropdown
                                  value={formData.medicalCouncil}
                                  onChange={(e) => {
                                    setOtherMedicalName({
                                      ...otherMedicalName,
                                      medicalCouncil: e.value
                                    })
                                  }}
                                  options={medicalCouncilOptionAst}
                                  placeholder="Select Medical Council"
                                  name="medicalCouncil"
                                  className="addFamilyDropdown"
                                  checkmark={true}
                                  highlightOnSelect={false}
                                /> */}
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </>) : (
                      <div className="inputBox">
                        <label>
                          Name of Registered Medical Council{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="card flex flex-column md:flex-row gap-1 mb-1 w-full">
                          <div
                            className="addFamilyInputField gradientBackground02_opacity"
                            style={{ width: "100%" }}
                          >
                            <Dropdown
                              value={formData.medicalCouncil}
                              onChange={(e) =>
                                handleDropdownChange(e, "medicalCouncil")
                              }
                              options={medicalCouncilOption}
                              placeholder="Select Medical Council"
                              name="medicalCouncil"
                              className="addFamilyDropdown"
                              checkmark={true}
                              highlightOnSelect={false}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  }


                  {/* MCI Registration */}
                  <div className="inputBox">
                    <label>
                      MCI Registration Number{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                               <i className="pi pi-envelope"></i>
                             </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        type="number"
                        value={formData.mciRegisteredNo}
                        onChange={handleInputChange}
                        placeholder="Enter MCI Number"
                        name="mciRegisteredNo"
                      />
                    </div>
                  </div>
                </div>
              )}
              {formPage === 4 && (
                <div style={{ padding: "15px" }}>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      paddingRight: "5px",
                      fontWeight: "700",
                      color: "#45474b",
                    }}
                  >
                    Current Occupation
                  </div>

                  {/* Type of HEalthcare System */}
                  <div className="questions multiInput">
                    <div className="inputBox">
                      <label>
                        Type of Healthcare System{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                    </div>
                    <div className="questionsbuttonGroup_01">
                      {typeHealthcareOption?.map((option: any) => (
                        <button
                          className={`questionsTextOptions_01 ${formData.typeHealthcare === option.label
                            ? "selected"
                            : ""
                            }`}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              instituteType: "",
                              typeHealthcare: option.label,
                            });
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.typeHealthcare === "Private" ? (
                    <>
                      {/* Private Hospital */}
                      <div className="questions multiInput">
                        <div className="inputBox">
                          <label>
                            Type of Institute{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>
                        <div className="questionsbuttonGroup_01">
                          {privateHospital?.map((option: any) => (
                            <button
                              className={`questionsTextOptions_01 ${formData.instituteType === option.label
                                ? "selected"
                                : ""
                                }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,

                                  instituteType: option.label,
                                });
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : formData.typeHealthcare === "Government" ? (
                    <>
                      {/* Government Hospital */}
                      <div className="questions multiInput">
                        <div className="inputBox">
                          <label>
                            Type of Institute{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>
                        <div className="questionsbuttonGroup_01">
                          {governmentHospital?.map((option: any) => (
                            <button
                              className={`questionsTextOptions_01 ${formData.instituteType === option.label
                                ? "selected"
                                : ""
                                }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  instituteType: option.label,
                                });
                              }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {/* Name of Institute */}
                  <div className="inputBox">
                    <label>
                      Name of Institute <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.nameInstitute}
                        onChange={handleInputChange}
                        placeholder="Enter Name of Institute"
                        name="nameInstitute"
                      />
                    </div>
                  </div>

                  {/* designation */}
                  <div className="inputBox">
                    <label>
                      Designation / Specialization <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="Enter Designation"
                        name="designation"
                      />
                    </div>
                  </div>

                  {/* department */}
                  <div className="inputBox">
                    <label>
                      Department <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Enter Department"
                        name="department"
                      />
                    </div>
                  </div>

                  {/* Institute Address */}
                  <div className="inputBox">
                    <label>
                      Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                      {/* <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span> */}
                      <InputText
                        style={{ width: "100%", textAlign: "left" }}
                        className="addFamilyInputText"
                        value={formData.instituteAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        name="instituteAddress"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "1.3rem",
                      paddingRight: "5px",
                      fontWeight: "700",
                      paddingTop: "20px",
                      color: "#45474b",
                    }}
                  >
                    Previous Work Experience
                  </div>

                  <div className="form-page">
                    {previousWork.map((work, index) => (
                      <div
                        key={index}
                        style={{ marginBottom: "20px", width: "100%" }}
                      >
                        <div className="inputBox" style={{ width: "100%" }}>
                          <label>Institute Name</label>
                          <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                            <InputText
                              style={{ width: "100%", textAlign: "left" }}
                              className="addFamilyInputText"
                              placeholder="Enter Institute Name"
                              name="instituteName"
                              value={work.instituteName}
                              onChange={(e) => PrevhandleInputChange(index, e)}
                            />
                          </div>
                        </div>

                        <div className="inputBox" style={{ width: "100%" }}>
                          <label>Department</label>
                          <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                            <InputText
                              style={{ width: "100%", textAlign: "left" }}
                              className="addFamilyInputText"
                              placeholder="Enter Department"
                              name="department"
                              value={work.department}
                              onChange={(e) => PrevhandleInputChange(index, e)}
                            />
                          </div>
                        </div>

                        <div className="inputBox">
                          <label>Designation</label>
                          <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                            <InputText
                              style={{ width: "100%", textAlign: "left" }}
                              className="addFamilyInputText"
                              placeholder="Enter Designation"
                              name="designation"
                              value={work.designation}
                              onChange={(e) => PrevhandleInputChange(index, e)}
                            />
                          </div>
                        </div>

                        <div className="inputBox" style={{ width: "100%" }}>
                          <label>Address</label>
                          <div className="p-inputgroup addFamilyInputField gradientBackground02_opacity">
                            <InputText
                              style={{ width: "100%", textAlign: "left" }}
                              className="addFamilyInputText"
                              placeholder="Enter Address"
                              name="address"
                              value={work.address}
                              onChange={(e) => PrevhandleInputChange(index, e)}
                            />
                          </div>
                        </div>

                        <div className="questions inputText inputBox">
                          <div className="p-inputgroup flex-1">
                            <label style={{ width: "50%", textAlign: "start" }}>
                              From Date
                            </label>
                            <label style={{ width: "50%", textAlign: "start" }}>
                              To Date
                            </label>
                          </div>
                          <div
                            className="p-inputgroup flex-1"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div style={{ width: "48%" }}>
                              <MonthYearPicker
                                value={
                                  work.fromDate
                                    ? work.fromDate.split("T")[0].slice(0, 7)
                                    : ""
                                }
                                onChange={(date) =>
                                  PrevhandleInputChange(index, {
                                    target: { name: "fromDate", value: date },
                                  })
                                }
                              />
                            </div>
                            <div style={{ width: "48%" }}>
                              <MonthYearPicker
                                value={
                                  work.toDate
                                    ? work.toDate.split("T")[0].slice(0, 7)
                                    : ""
                                }
                                onChange={(date) =>
                                  PrevhandleInputChange(index, {
                                    target: { name: "toDate", value: date },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePreviousWork(index)}
                          style={{
                            marginTop: "10px",
                            marginBottom: "5px",
                            width: "100%",
                            backgroundColor: "#EE4E4E",
                            color: "#fff",
                            padding: "15px",
                            display: "flex",
                            justifyContent: "center",
                            borderRadius: "5px",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <Divider />

                  <button
                    type="button"
                    onClick={addPreviousWork}
                    className=""
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                      width: "100%",
                      padding: "15px",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "5px",
                      color: "#a4d6f5",
                      background:
                        "linear-gradient(-167deg, rgb(15, 149, 232) 0%, rgb(3, 117, 198) 100%)",
                    }}
                  >
                    Add More
                  </button>
                </div>
              )}
              {formPage === 5 && (
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
                        type="number"
                        style={{ width: "100%", textAlign: "left" }}
                        value={formData.refUserMobileno}
                        className="addFamilyInputText"
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
                      style={{
                        display: "flex",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
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
                      style={{
                        display: "flex",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
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
                      style={{
                        display: "flex",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {/[!@#$%^&*(),.?":{}|<>]/.test(
                        formData.refUserPassword
                      ) ? (
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
                      style={{
                        display: "flex",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
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
                        value={formData.refUserConPassword}
                        onChange={handleInputChange}
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        style={{ borderRadius: "10px" }}
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
                      style={{
                        display: "flex",
                        fontSize: "1rem",
                        color: "#45474b",
                      }}
                    >
                      {formData.refUserPassword ===
                        formData.refUserConPassword &&
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
                      &nbsp;Password Must Match
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="inputBox">
                    <label>
                      Select{" "}
                      {localStorage.getItem("createRoleId") === "1"
                        ? "Assistants"
                        : localStorage.getItem("createRoleId") === "4"
                          ? "Assistants"
                          : localStorage.getItem("createRoleId") === "2"
                            ? "Doctors"
                            : null}{" "}
                      {
                        localStorage.getItem("createRoleId") === "2" && (<span style={{ color: "red" }}>*</span>)
                      }
                    </label>
                    <div
                      className="addFamilyInputField gradientBackground02_opacity"
                      style={{ width: "100%" }}
                    >
                      <MultiSelect
                        className="addFamilyDropdown"
                        style={{ textAlign: "start" }}
                        value={formData.selectedUsers}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            selectedUsers: e.value,
                          });
                        }}
                        options={userList}
                        optionLabel="name"
                        placeholder={`Select  ${localStorage.getItem("createRoleId") === "1"
                          ? "Assistants"
                          : localStorage.getItem("createRoleId") === "4"
                            ? "Assistants"
                            : localStorage.getItem("createRoleId") === "2"
                              ? "Doctors"
                              : null
                          }`}
                        maxSelectedLabels={3}
                      />
                    </div>
                  </div>

                  {/* Make as Admin */}
                  {localStorage.getItem("createRoleId") === "2" ? null : (
                    <div
                      className="inputBox"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <IonCheckbox
                        onIonChange={(e) => {
                          setCheckedAdmin(e.detail.checked);
                          if (e.detail.checked) {
                            localStorage.setItem("createRoleId", "4");
                          } else {
                            localStorage.setItem("createRoleId", "1");
                          }
                        }}
                        checked={checkedAdmin}
                        labelPlacement="start"
                      >
                        <label>Make as Admin</label>
                      </IonCheckbox>
                    </div>
                  )}
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
              {formPage === 5 ? (
                <>
                  {loading ? (
                    <button className="submitbtn">
                      <i className="pi pi-spin pi-spinner"></i>
                    </button>
                  ) : (
                    <button
                      className="submitbtn"
                      onClick={() => {
                        if (formPage === 5) {
                          if (verifyForm5()) {
                            setLoading(true);
                            handleSignup();
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
                    } else if (formPage === 4) {
                      if (verifyForm4()) {
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StaffSignup;
