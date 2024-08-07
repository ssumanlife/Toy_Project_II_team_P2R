import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string;
  accountNumber: string;
  baseSalary: string;
}

const getEmployeeData = async (): Promise<Employee[]> => {
  const employeeData: Employee[] = [];
  const userEmployees: Employee[] = [];

  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const data = memberDoc.data();

      // isAdmin이 false인 경우에만 처리
      if (data.isAdmin === false) {
        // 기본급 가져오기
        const payrollDetailsSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollDetails`));
        let salary = '2100000';

        payrollDetailsSnapshot.forEach((doc) => {
          const payrollData = doc.data();
          salary = payrollData.baseSalary;
        });

        const employee: Employee = {
          employeeId: memberDoc.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          workDay: data.workDay,
          accountNumber: data.accountNumber,
          baseSalary: salary,
        };

        if (memberDoc.id.startsWith('user')) {
          userEmployees.push(employee);
        } else {
          employeeData.push(employee);
        }
      }
    });

    await Promise.all(memberPromises);

    // user로 시작하는 데이터를 맨 앞에 추가
    employeeData.unshift(...userEmployees);
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }

  return employeeData;
};

export { getEmployeeData };

// const getEmployeeData = async (): Promise<Employee[]> => {
//   const employeeData: Employee[] = [];
//   const userEmployees: Employee[] = [];

//   try {
//     const membersSnapshot = await getDocs(collection(db, 'members'));

//     const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
//       const data = memberDoc.data();

//       // isAdmin이 false인 경우에만 처리
//       if (data.isAdmin === false) {
//         // 기본급 가져오기
//         const payrollDetailsSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollDetails`));
//         let salary = '2100000';

//         payrollDetailsSnapshot.forEach((doc) => {
//           const payrollData = doc.data();
//           salary = payrollData.baseSalary;
//         });

//         const employee: Employee = {
//           employeeId: memberDoc.id,
//           name: data.name,
//           phoneNumber: data.phoneNumber,
//           workDay: data.workDay,
//           accountNumber: data.accountNumber,
//           baseSalary: salary,
//         };

//         if (memberDoc.id.startsWith('user')) {
//           userEmployees.push(employee);
//         } else {
//           employeeData.push(employee);
//         }
//       }
//     });

//     await Promise.all(memberPromises);

//     // user로 시작하는 데이터를 맨 앞에 추가
//     employeeData.unshift(...userEmployees);
//   } catch (error) {
//     console.error('Error fetching employee data:', error);
//   }

//   return employeeData;
// };

// export { getEmployeeData };
