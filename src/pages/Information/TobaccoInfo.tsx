import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";



const TobaccoInfo: React.FC = () => {

  const [listofDiasease, setListofDiasease] = useState([
    "Heart Attack, Stroke, and Other Cardiovascular Diseases",
    "Oral Cancer And Other Oral Diseases",
    "Throat Cancer",
    "Fetal Death",
    "Reduced Fetal Growth, Low Birth Weight And Preterm Delivery",
    "Lung Cancer",
    "Asthma",
    "Chronic Obstructive Pulmonary Disease",
    "Tuberculosis",
    "Other Respiratory Illnesses and Reduced Lung Function",
    "Type 2 Diabetes",
    "Dementia",
    "Reduced Fertility in Men And Women",
    "Erectile Dysfunction",
    "Sudden Infant Death Syndrome",
    "Menstruation And Menopause",
    "Birth Defects",
    "Vision Loss",
    "Hearing Loss",
    "Gastrointestinal Diseases",
    "Weakened Immune System",
    "Weak Bones",
    "Skin Damage"
  ]);

  return (
    <IonContent className="ion-padding">
      <IonAccordionGroup>
        <IonAccordion value="first" style={{ paddingBottom: "10px" }}>
          <IonItem slot="header" color="light" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
            <IonLabel className="font-bold" style={{ color: "#383838" }}>
              Why Tobacco usage is a major hazard to mankind worldwide?
            </IonLabel>
          </IonItem>
          <div className="" slot="content" >
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Tobacco use remains the leading preventable
                  cause of death in the world accounting for about
                  1 in 5 deaths each year.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>On average, people who smoke die about
                  10 years earlier than people who have never
                  smoked.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Most people know smoking can cause cancer.
                  But it can also cause a number of other diseases
                  and can damage nearly every organ in the
                  body, including the lungs, heart, blood vessels,
                  reproductive organs, mouth, skin, eyes, and
                  bones.
                </li>
              </IonLabel>
            </IonItem>
          </div>
        </IonAccordion>
        <IonAccordion value="second" style={{ paddingBottom: "10px" }}>
          <IonItem slot="header" color="light" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
            <IonLabel className="font-bold" style={{ color: "#383838" }}>
              How smoking tobacco affects your health?
            </IonLabel>
          </IonItem>
          <div className="" slot="content" >
            {
              listofDiasease.map((element) => (
                <IonItem>
                  <IonLabel style={{ textAlign: "justify" }}>
                    <li style={{ fontSize: "0.8rem" }}>
                      {element}
                    </li>
                  </IonLabel>
                </IonItem>
              ))
            }
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                Smoking can affect a person's health in many
                other ways as well, harming nearly every organ in
                the body. Here are a few examples of other ways
                smoking tobacco can affect your health:
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Increased risk of gum disease and tooth loss.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Lowered immune system function increase risk
                  of infectious diseases like Tuberculosis. flu, sinus
                  infections etc.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Increased risk of type 2 diabetes, SHT , Heart
                  disease, Stroke etc.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Increase the risk of Developing cancer.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Affect the sexual function and reproductive
                  organs leading to infertility and impotency.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Decreased sense of smell and taste.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Premature aging of the skin.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Bad breath and stained teeth.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Lower bone density (thinner bones), which
                  means a higher risk for broken bones, including hip
                  fracture,
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Higher risk of rheumatoid arthritis.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Increased risk for cataracts (clouding of the lenses of the eyes).
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Increased risk for age-related macular
                  degeneration, which can lead to blindness.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Wounds taking longer to heal Many of the health
                  problems linked to smoking can lower a person's
                  quality of life. Smoking-related illness can make it
                  harder for a person to breathe, get around, work, or
                  play. Quitting smoking, especially at younger ages,
                  can reduce smoking-related disability.
                </li>
              </IonLabel>
            </IonItem>
          </div>
        </IonAccordion>
        <IonAccordion value="third" style={{ paddingBottom: "10px" }}>
          <IonItem slot="header" color="light" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
            <IonLabel className="font-bold" style={{ color: "#383838" }}>
              How smoking tobacco damages your
              lungs?
            </IonLabel>
          </IonItem>
          <div className="" slot="content" >
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                Smoking damages the airways and small air
                sacs in your lungs. This damage starts soon
                after someone starts smoking, and lung function
                continues to worsen as long as the person
                smokes. Still, it may take years for the problem to
                become noticeable enough for lung disease to be
                diagnosed. Smoke damage in the lungs can lead
                to serious long-term lung diseases such as chronic
                obstructive pulmonary disease (COPD).
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                Smoking can also increase the risk of lung
                infections such as pneumonia and tuberculosis,
                and it can worsen some existing lung diseases,
                such as asthma.
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                COPD, which is one of the leading causes of death,
                includes both chronic bronchitis and emphysema
                (discussed below).
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                Most people with COPD have both of these
                conditions, but the severity of each of them varies
                from person to person. In COPD, damage to the
                small airways in the lungs makes it hard for the
                lungs to get oxygen to the rest of the body.
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                Smoking is by far the most common cause of
                COPD. The risk goes up the more you smoke and
                the longer you smoke.
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Some of the early signs and symptoms of
                    COPD:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Noises in the chest (such as wheezing,
                    rattling, or whistling).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Shortness of breath when active (walking,
                    climbing etc).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Coughing up mucus (phlegm).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Over time, COPD can make it hard to breathe
                    at rest as well, COPD tends to get worse over
                    time, especially if a person continues to
                    smoke. There is no cure for COPD, although some
                    medicines might help with symptoms.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Chronic bronchitis:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Chronic bronchitis is a common problem in
                    people who smoke for a long time.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - In this disease, the airways make too much
                    mucus, forcing the person to try to cough it out.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - The airways become inflamed (swollen), and
                    the cough becomes chronic (long-lasting).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - The symptoms can get better at times, but
                    the cough keeps coming back.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Over time, the airways can get blocked by
                    scar tissue and mucus, which can lead to bad
                    lung infections (pneumonia).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - There's no cure for chronic bronchitis, but
                    quitting smoking can help keep symptoms under
                    control and help keep the damage from getting
                    worse.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Emphysema:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - In emphysema, the walls between the tiny air
                    sacs in the lungs break down, which creates
                    larger but fewer sacs.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - This lowers the amount of oxygen reaching
                    the blood.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Over time, these sacs can break down to the
                    point where a person with emphysema might
                    struggle to get enough air, even when at rest.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - People with emphysema are at risk for many
                    other problems linked to weak lung function,
                    including pneumonia.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - In later stages of the disease, patients often
                    need an oxygen mask or tube to help them
                    breathe.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Emphysema cannot be cured, but it can be
                    treated and slowed down if the person stops
                    smoking.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
          </div>
        </IonAccordion>
        <IonAccordion value="fourth" style={{ paddingBottom: "10px" }}>
          <IonItem slot="header" color="light" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
            <IonLabel className="font-bold" style={{ color: "#383838" }}>
              How smoking tobacco affects your heart and
              blood vessels?
            </IonLabel>
          </IonItem>
          <div className="" slot="content" >
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Smoking tobacco damages your heart and blood
                  vessels (cardiovascular system), increasing your
                  risk of heart disease and stroke.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Smoking is a major cause of coronary heart
                  disease (CHD), in which the arteries of the heart
                  can't supply the heart muscle with enough
                  oxygen-rich blood.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  CHD is the main cause of heart attacks, and it's
                  the leading cause of death in the world.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Mechanism:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Smoking causes high blood pressure, lowers
                    your ability to exercise, and makes your blood
                    more likely to clot.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - It also lowers HDL (good) cholesterol levels
                    in the blood. All of these are risk factors for heart
                    attacks and strokes.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Smoking is a major risk factor for peripheral
                    arterial disease (PAD).:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - In PAD, plaque builds up in the arteries that
                    carry blood to the head, organs, and limbs.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - This increases your risk of heart disease,
                    heart attack, and stroke.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - This can lead to pain in the legs when
                    walking, and may lead to open sores that don't
                    heal.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Because smoking affects blood flow, it can
                    lower the body's ability to heal from wounds
                    leading to non healing wound ulcers resulting in
                    amputation.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  <b>Smoking increases the risk of having an aortic
                    aneurysm.:</b>
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Aortic aneurysm is a balloon-like bulge in the
                    aorta, the main artery carrying blood from the
                    heart to other organs.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - It is caused by a weakening of the wall of the
                    aorta.
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <ul style={{ listStyleType: "none", margin: 0, paddingLeft: "1rem" }}>
                  <li>
                    - Aortic aneurysms can grow larger over time,
                    and they can be life threatening if they rupture
                    (break open).
                  </li>
                </ul>
              </IonLabel>
            </IonItem>
          </div>
        </IonAccordion>
        <IonAccordion value="fivth" style={{ paddingBottom: "10px" }}>
          <IonItem slot="header" color="light" style={{ borderRadius: "10px", fontSize: "0.9rem" }}>
            <IonLabel className="font-bold" style={{ color: "#383838" }}>
              How smoking tobacco can affect your sex
              life and reproductive system?
            </IonLabel>
          </IonItem>
          <div className="" slot="content" >
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <b>Women</b>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Tobacco use can damage a woman's
                  reproductive health.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                For example, women who smoke are more likely
                to have trouble getting pregnant.
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Smoking while pregnant can also lead to health
                  problems that can affect both mother and baby.
                  Women who smoke while pregnant have a higher
                  risk of
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  An ectopic pregnancy (where the embryo
                  implants outside the uterus), which can threaten
                  the mother's life.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Problems with the placenta, which is the organ
                  that connects the mother to fetus. The placenta
                  might be in the wrong spot (placenta previa), or it
                  might separate from the uterus too early (placental
                  abruption). These problems might lead to serious
                  bleeding, early delivery (premature birth), or
                  other problems with the delivery, some of which
                  might require an emergency Caesarean section
                  (C-section).
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Premature births and low birth-weight babies.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Miscarriages and stillbirths.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Having a child with a cleft lip, cleft palate, and
                  possibly other birth defects.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Babies of mothers who smoke during and after
                  pregnancy are also more likely to die from sudden
                  infant death syndrome (SIDS).
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify", fontSize: "0.8rem" }}>
                <b>Men</b>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Smoking can damage blood vessels anywhere in
                  the body.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Blood flow in the penis is a key part of male
                  erections.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Men who smoke have a higher risk of erectile
                  dysfunction.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  This risk increases the more they smoke and the
                  longer they smoke.
                </li>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel style={{ textAlign: "justify" }}>
                <li style={{ fontSize: "0.8rem" }}>
                  Smoking can also affect sperm, which
                  can reduce fertility and increase the risk for
                  miscarriages and birth defects.
                </li>
              </IonLabel>
            </IonItem>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </IonContent>
    // </IonPage>
  );
};

export default TobaccoInfo;
