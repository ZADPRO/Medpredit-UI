import React, { useState } from "react";
import "./PatientSignupForm.css";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { IoBody } from "react-icons/io5";
import { IonDatetime, IonModal } from "@ionic/react";
import { Divider } from "primereact/divider";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";

const PatientSignupForm = () => {
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
    " Higher Secondary",
    "Undergraduate (UG)",
    "Postgraduate (PG)",
  ];
  const occupationcategoryOtp: string[] = [
    "Professional",
    "Semi- Profession",
    "Clerical, shop-owner, farmer",
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

  // const handleDateChange = (e: any) => {
  //   const date = e.value as Date;

  //   setFormData({
  //     ...formData,
  //     refDOB: date,
  //   });
  //   closeModal();
  // };

  return (
    <div>
      <div>
        <div style={{ padding: "0px 15px" }}>
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
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Enter First Name" name="refUserFname" />
              </div>
            </div>
            {/* Last Name */}
            <div className="inputBox">
              <label>
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="Enter Last Name" name="refUserFname" />
              </div>
            </div>
            {/* Gender */}
            <div className="inputBox">
              <label>
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup flex-1">
                <Dropdown
                  options={genderOpt}
                  placeholder="Select Gender"
                  name="refGender"
                  className="w-full"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
            {/* Date of Birth */}
            <div className="inputBox">
              <label>
                Date of Birth <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup flex-1">
                <InputText
                  //   value={formData.refDOB ? formData.refDOB.split("T")[0] : ""}
                  placeholder="Date of Birth"
                  className="w-full"
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
              <div style={{ width: "100%", background: "#f4f5f7" }}>
                <IonDatetime
                  presentation="date"
                  preferWheel={true}
                  // value={formData.refDOB}
                  // onIonChange={(e) => {
                  //   const selectedDate = e.detail.value;
                  //   setFormData({
                  //     ...formData,
                  //     refDOB: selectedDate,
                  //   });
                  // }}
                ></IonDatetime>
                <Divider />
                <div
                  style={{
                    background: "#f4f5f7",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    onClick={() => {
                      //   setFormData({
                      //     ...formData,
                      //     refDOB: "",
                      //   });
                      closeModal();
                    }}
                    style={{
                      width: "40%",
                      background: "#505050",
                      padding: "15px",
                      textAlign: "center",
                      fontSize: "1rem",
                      color: "#fff",
                      borderRadius: "10px",
                      fontWeight: "700",
                    }}
                  >
                    Clear
                  </div>
                  <div
                    onClick={closeModal}
                    style={{
                      width: "40%",
                      background: "green",
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
              <div className="p-inputgroup flex-1">
                <Dropdown
                  options={refMaritalStatus}
                  placeholder="Select Marital Status"
                  name="refGender"
                  className="w-full"
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
                Education <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-graduation-cap"></i>
                </span>
                <Dropdown
                  //   value={formData.refEducation}
                  name="educationOpt"
                  //   onChange={(e) => handleDropdownChange(e, "refEducation")}
                  options={educationOpt}
                  optionLabel="name"
                  placeholder="Select Education"
                  className="w-full"
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
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-briefcase"></i>
                </span>
                <Dropdown
                  // value={formData.refProfession}
                  name="refProfession"
                  // onChange={(e) => handleDropdownChange(e, "refProfession")}
                  options={occupationcategoryOtp}
                  optionLabel="name"
                  placeholder="Occupation Category"
                  className="w-full"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
            {/* Sector */}
            <div className="inputBox">
              <label>
                Sector <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span> */}
                <InputText placeholder="Enter Sector" name="refUserFname" />
              </div>
            </div>
          </div>
        )}
        {formPage === 3 && (
          <div style={{ padding: "15px" }}>
            {/* Education */}
            <div className="inputBox">
              <label>Email</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span>
                <InputText placeholder="Enter Email" name="refUserFname" />
              </div>
            </div>
            {/* Address */}
            <div className="inputBox">
              <label>
                Address <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                <InputTextarea
                  placeholder="Enter Address"
                  style={{ borderRadius: "5px" }}
                  rows={3}
                  name="refUserFname"
                />
              </div>
            </div>
            {/* District */}
            <div className="inputBox">
              <label>
                District <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span> */}
                <InputText placeholder="Enter District" name="refUserFname" />
              </div>
            </div>
            {/* Pincode */}
            <div className="inputBox">
              <label>
                Pincode <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span> */}
                <InputNumber
                  placeholder="Enter Pincode"
                  name="refUserFname"
                  useGrouping={false}
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
              <div className="p-inputgroup">
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span> */}
                <InputNumber
                  placeholder="Enter Mobile Number"
                  name="refUserFname"
                  useGrouping={false}
                />
              </div>
            </div>
            {/* Password */}
            <div className="inputBox">
              <label>
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                <Password
                  style={{ borderRadius: "10px" }}
                  placeholder="Enter Password"
                  name="refUserFname"
                  toggleMask
                  feedback={false}
                  tabIndex={1}
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div className="inputBox">
              <label>
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <div className="p-inputgroup">
                <Password
                  style={{ borderRadius: "10px" }}
                  placeholder="Enter Confirm Password"
                  name="refUserFname"
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
                &nbsp; Atleast One Character Letter
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
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
                &nbsp; Atleast One Special Character Letter
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
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
                &nbsp; Atleast Above 8 Characters
              </div>
              <div
                style={{ display: "flex", fontSize: "1rem", color: "#45474b" }}
              >
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
                &nbsp; Confirm Password
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
          <button className="submitbtn" onClick={handleNextPage}>
            Sign Up
          </button>
        ) : (
          <button
            className="sidnupbtn"
            onClick={handleNextPage}
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
