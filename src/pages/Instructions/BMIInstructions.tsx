import { IonContent } from "@ionic/react";
import { Divider } from "primereact/divider";
import React from "react";

const BMIInstructions = () => {
  return (
    <IonContent className="ion-padding custom-scrollbar02">
      <p style={{ fontWeight: "bold" }}>
        What do you mean by the term Obesity?
      </p>
      <ul>
        <li style={{ textAlign: "justify" }}>
          A condition characterized by abnormal or excessive fat accumulation in
          the body.{" "}
        </li>
        <li style={{ textAlign: "justify" }}>
          It's important to remember that obesity isn't just about appearance,
          it's about health and well-being.{" "}
        </li>
      </ul>

      <Divider />

      <p style={{ fontWeight: "bold" }}>
        Why is it important to measure obesity?{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        Being obese can open the door to a range of health risks, kind of like
        how a heavy storm can lead to flooding. Here are some potential risks:{" "}
      </p>
      <ul>
        <li style={{ textAlign: "justify" }}>
          <b>Heart Disease:</b> Extra weight can strain your heart, increasing
          the risk of heart attacks and strokes.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Diabetes:</b> Obesity is a major risk factor for type 2 diabetes,
          as it can affect how your body processes insulin.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Joint Problems:</b> Carrying excess weight can put pressure on your
          joints, leading to conditions like osteoarthritis.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Sleep Apnea:</b> Obesity can contribute to sleep apnea, a condition
          where breathing stops and starts during sleep, affecting rest quality.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Certain Cancers:</b> There's an increased risk of certain cancers,
          including breast, colon, and endometrial cancers.{" "}
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Mental Health Issues:</b> Obesity can also impact mental health,
          leading to conditions like depression and anxiety.{" "}
        </li>
      </ul>
      <Divider />

      <p style={{ fontWeight: "bold" }}>How can I know whether I am obese? </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        To measure obesity, there are a few tests and assessments that can help
        paint a clearer picture of your health. Here are some common ones:{" "}
      </p>
      <ul>
        <li style={{ textAlign: "justify" }}>
          <b>BMI (Body Mass Index):</b> This is the most widely used method.
          It's calculated using your weight and height.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Waist Circumference:</b> Measuring your waist can help assess
          abdominal fat. A waist measurement over 40 inches for men and 35
          inches for women is considered high risk.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Waist-Hip Ratio (WHR):</b> As we discussed earlier, this ratio
          helps understand fat distribution and associated health risks.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Body Fat Percentage:</b> This can be measured using skinfold
          calipers, bioelectrical impedance, or more advanced methods like DEXA
          scans. It gives a clearer picture of how much of your body is made up
          of fat.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Bioelectrical Impedance Analysis (BIA):</b> This test uses a small
          electrical current to estimate body composition, including fat mass
          and lean mass.
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>CT or MRI Scans:</b> These imaging tests can provide detailed
          information about fat distribution in the body, but they are usually
          reserved for specific medical evaluations.{" "}
        </li>
      </ul>
      <Divider />
      <p style={{ fontWeight: "bold" }}>
        What is the BMI range recommended for Asian and South Asian (Indian)?{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        For Indians, the BMI categories are a bit different from the standard
        ones. Here's how it breaks down:{" "}
      </p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f9", textAlign: "left" }}>
            <th
              style={{
                width: "50%",
                fontSize: "1rem",
                padding: "12px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              BMI Range (kg/m²)
            </th>
            <th
              style={{
                width: "50%",
                fontSize: "1rem",
                padding: "12px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Category
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {[
            { range: "Below 18.5 kg/m²", category: "Underweight" },
            { range: "18.5 - 22.9 kg/m²", category: "Normal BMI" },
            { range: "23.0 - 24.9 kg/m²", category: "Overweight" },
            {
              range: "25 kg/m² and above",
              category: "Obese)",
            },
          ].map((item, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
              }}
            >
              <td
                align="center"
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {item.range}
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.9rem",
                }}
              >
                {item.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />

      <p style={{ fontWeight: "bold" }}>
        Why are the cut-offs for normal weight and overweight categories for
        Indians are lower when compared to the global standards?{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        This is because research has shown that South Asians tend to have a
        higher body fat percentage at lower BMI levels compared to Western
        populations.{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        Here are a couple of reasons why this adjustment is made:{" "}
      </p>
      <ul>
        <li style={{ textAlign: "justify" }}>
          <b>Genetic Factors:</b> South Asians often have a genetic
          predisposition to store fat differently, particularly around the
          abdomen, which can increase health risks even at lower BMI levels.{" "}
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Health Risks:</b> Studies have indicated that conditions like
          diabetes and heart disease can develop at lower BMI levels in South
          Asians.{" "}
        </li>
      </ul>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        So, the cut-offs are tailored to identify these risks earlier and
        encourage preventive measures.{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        It's all about recognizing the unique health profiles of different
        populations and ensuring that guidelines are relevant and effective.{" "}
      </p>

      <Divider />

      <p style={{ fontWeight: "bold" }}>
        Why is it important to keep an eye on Waist Hip ratio?{""}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        Keeping an eye on your waist-hip ratio (WHR) can be a smart move,
        especially if you're working not only on reducing tummy fat but it also
        improves overall health and well being.{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        WHR is like a measuring tape for your body's shape, giving insight into
        fat distribution.{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        It's important for a few reasons:{" "}
      </p>
      <ul>
        <li style={{ textAlign: "justify" }}>
          <b>Health Indicator:</b> higher WHR can indicate a greater risk of
          cardiovascular diseases and metabolic issues, even if your BMI is
          normal. It's like having a warning light for potential health
          problems.{" "}
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Fat Distribution:</b> It helps understand where your body stores
          fat.People with more abdominal fat (apple-shaped) are at higher risk
          than those with more hip fat (pear-shaped).
        </li>
        <li style={{ textAlign: "justify" }}>
          <b>Simple Measurement:</b> It's easy to calculate and doesn't require
          fancy equipment - just a measuring tape!{" "}
        </li>
      </ul>

      <Divider />

      <p style={{ fontWeight: "bold" }}>
        How can I interpret my WAIST HIP RATIO ?{" "}
      </p>
      <p style={{ paddingLeft: "0.5rem", textAlign: "justify" }}>
        It is simple Here you can analysis yourself - just enter your waist and
        hip circumference in CM and find your position.{" "}
      </p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f9", textAlign: "left" }}>
            <th
              style={{
                width: "30%",
                fontSize: "1rem",
                padding: "0.8rem",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              {" "}
            </th>
            <th
              style={{
                width: "35%",
                fontSize: "1rem",
                padding: "0.8rem",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Male
            </th>
            <th
              style={{
                width: "35%",
                fontSize: "1rem",
                padding: "0.8rem",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              Female
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          {[
            { range: "Excellent", category1: "< 0.85", category2: "< 0.75" },
            {
              range: "Good",
              category1: "0.85 - 0.89",
              category2: "0.75 - 0.79",
            },
            {
              range: "Average",
              category1: "0.90 - 0.95",
              category2: "0.80 - 0.86",
            },
            { range: "At Risk", category1: ">= 0.95", category2: ">= 0.86" },
          ].map((item, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
              }}
            >
              <td
                align="center"
                style={{
                  padding: "0.8rem",
                  borderBottom: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {item.range}
              </td>
              <td
                style={{
                  paddingLeft: "0.7rem",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.8rem",
                }}
              >
                {item.category1}
              </td>
              <td
                style={{
                  paddingLeft: "0.7rem",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "0.8rem",
                }}
              >
                {item.category2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Divider />
    </IonContent>
  );
};

export default BMIInstructions;
