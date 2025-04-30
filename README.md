# แบบฟอร์มส่งงานสอบ Take-home | Take-home Assignment Template

**ชื่อ - นามสกุล (Full Name):** [สุพิชญา ระเบียบนาวีนุรักษ์]  
**รหัสนักศึกษา (Student ID):** [6631503118]  
**ชื่อแอป (App Name):** MoonPhase
**Framework ที่ใช้ (Framework Used):** React Native (Expo)  
**ลิงก์ GitHub Repository:** [https://github.com/SeaSupichaya/moon-phase-app]  
**ลิงก์ไฟล์ติดตั้ง (APK/IPA):** [https://expo.dev/accounts/seazazel/projects/moon-phase-app/builds/adab21a6-5aab-4bab-934f-9d775fc4c544]  

---

## 1. การออกแบบแอป | App Concept and Design (2 คะแนน / 2 pts)

### 1.1 ผู้ใช้งานเป้าหมาย | User Personas
**Persona 1:**  
- ชื่อ: เมย์  
- อายุ: 21 ปี  
- อาชีพ: นักศึกษาศิลปะ  
- ความต้องการ: สนใจการดูดวงและดาราศาสตร์ ต้องการติดตามข้างขึ้นข้างแรม

**Persona 2:**  
- ชื่อ: ทอม  
- อายุ: 24 ปี  
- อาชีพ: นักพัฒนาแอปมือถือ  
- ความต้องการ: ต้องการข้อมูลท้องฟ้ายามค่ำคืนเพื่อใช้ในกิจกรรมส่องกล้องดูดาว

### 1.2 เป้าหมายของแอป | App Goals
- แสดงข้อมูลข้างขึ้นข้างแรมและดวงจันทร์ปัจจุบัน  
- แสดงปฏิทินจันทรคติ  
- แสดงกลุ่มดาวบนท้องฟ้า  
- ให้ผู้ใช้ปรับโหมดแอป (แสง/มืด) ได้  

### 1.3 โครงร่างหน้าจอ / Mockup
- **Home:** แสดงเฟสของดวงจันทร์ปัจจุบันและข้อมูลที่เกี่ยวข้อง  
- **Calendar:** ปฏิทินจันทรคติรายเดือน  
- **Constellations:** รายชื่อและแผนที่กลุ่มดาว  
- **Settings:** ปรับธีมแอป เช่น Dark/Light Mode  

### 1.4 การไหลของผู้ใช้งาน | User Flow
เปิดแอป > เข้าหน้า Home > แตะดูปฏิทิน > สำรวจกลุ่มดาว > ปรับธีมแอป  

---

## 2. การพัฒนาแอป | App Implementation (4 คะแนน / 4 pts)

### 2.1 รายละเอียดการพัฒนา | Development Details
**เครื่องมือที่ใช้ / Tools used:**  
- Expo SDK 
- React Native  
- TypeScript  
- React Navigation  
- Context API for theme and data  
- Custom hooks for celestial data fetching  

### 2.2 ฟังก์ชันที่พัฒนา | Features Implemented
- [x] แสดงเฟสดวงจันทร์และข้อมูลที่เกี่ยวข้อง  
- [x] ปฏิทินจันทรคติ  
- [x] รายชื่อกลุ่มดาว  
- [x] ปรับโหมดมืด/สว่าง  

### 2.3 ภาพหน้าจอแอป | App Screenshots  
- (https://drive.google.com/drive/folders/1PxKuFDEkkRZ_mosueKAtNN-QZSu-syVg?usp=drive_link)
---

## 3. การ Build และติดตั้งแอป | Deployment (2 คะแนน / 2 pts)

### 3.1 ประเภท Build | Build Type  
- [x] Debug  
- [ ] Release  

### 3.2 แพลตฟอร์มที่ทดสอบ | Platform Tested  
- [x] Android  
- [ ] iOS  

### 3.3 ไฟล์ README และวิธีติดตั้ง | README & Install Guide  
1. ดาวน์โหลดไฟล์ .apk  
2. เปิดในอุปกรณ์ Android  
3. ติดตั้งผ่าน File Manager  

---

## 4. การสะท้อนผลลัพธ์ | Reflection (2 คะแนน / 2 pts)
- ได้เรียนรู้การจัดการ context และการออกแบบโครงสร้างแอปแบบ modular  
- เจอปัญหา fetch API ล่าช้าใน Android บางเครื่อง และแก้ไขด้วย caching  
- หากมีเวลาเพิ่ม จะเพิ่มระบบแจ้งเตือนปรากฏการณ์พิเศษทางดาราศาสตร์  

---

## 5. การใช้ AI ช่วยพัฒนา | AI Assisted Development (Bonus)

### 5.1 ใช้ AI ช่วยคิดไอเดีย | Idea Generation  
**ไม่ได้ใช้**

### 5.2 ใช้ AI ช่วยออกแบบ UI | UI Layout Prompt  
**Prompt ที่ใช้:**  
"Design 4-tab layout for moon phase tracking app with calendar and settings."  
**ผลลัพธ์:**  
ได้ layout แบบ Bottom Tab Navigator พร้อมแนวทาง UI แต่ละหน้าจอ  

### 5.3 ใช้ AI ช่วยเขียนโค้ด | Code Writing Prompt  
**Prompt ที่ใช้:**  
"React Native code for theme provider."  
**ผลลัพธ์:**  
ได้วิธีการนำ theme context มาใช้กับ theme provider 

### 5.4 ใช้ AI ช่วย debug | Debug Prompt  
**Prompt ที่ใช้:**  
"My app ui bug when i add this componet "  
**ผลลัพธ์:**  
AI ช่วยแก้ไขโค้กที่วางไม่ถูกที่

### 5.5 ใช้ AI ช่วย Deploy | Deployment Prompt  
**Prompt ที่ใช้:**  
"Cli for eas build apk"  
**ผลลัพธ์:**  
AI ให้ cli ที่จำเป็นในการ build และ ขั้นตอนการ build

---

## ✅ Checklist ก่อนส่ง | Final Checklist  
- [x] กรอกข้อมูลครบทุก Section  
- [x] แนบ GitHub และไฟล์ติดตั้ง  
- [x] สะท้อนผล และใช้ AI อย่างมีเหตุผล  
