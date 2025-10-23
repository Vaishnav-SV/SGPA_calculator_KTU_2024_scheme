document.addEventListener("DOMContentLoaded", () => {
  const branchSelect = document.getElementById("branch");
  const semesterSelect = document.getElementById("semester");
  const container = document.getElementById("subjects-container");
  const subjectsTable = document.getElementById("subjects-table");
  const addBtn = document.getElementById("add-subject");
  const calcBtn = document.getElementById("calc-btn");
  const summary = document.getElementById("summary");
  const summaryBody = document.getElementById("summary-body");
  const displaySem = document.getElementById("display-semester");
  const displayBranch = document.getElementById("display-branch");
  const resultDiv = document.getElementById("result");
  const exportBtn = document.getElementById("export-pdf");
  const clearBtn = document.getElementById("clear-btn");

  const gradeOptions = `
    <option value="">Select Grade</option>
    <option value="10">S</option>
    <option value="9">A+</option>
    <option value="8.5">A</option>
    <option value="8">B+</option>
    <option value="7.5">B</option>
    <option value="7">C+</option>
    <option value="6.5">C</option>
    <option value="6">D</option>
    <option value="5.5">P</option>
  `;

  const subjectsData = {
  CSE: {
    1: [
      {name:"Maths I", credit:3},
      {name:"Chemistry", credit:4},
      {name:"Engineering Graphics", credit:3},
      {name:"IEEE", credit:4},
      {name:"Algorithimic Thinking with Python", credit:4},
      {name:"Basic Electrical and Electronics Workshop", credit:1}
    ],
    2: [
      {name:"Maths II", credit:3},
      {name:"Physics", credit:4},
      {name:"FOC", credit:3},
      {name:"Programming in C", credit:4},
      {name:"Discrete Mathematics", credit:4},
      {name:"Enginnering Entreprenership & IPR", credit:3},
      {name:"IT Workshop", credit:1}
    ],
    3: [
      {name:"Maths III", credit:3},
      {name:"Theory of Computation", credit:4},
      {name:"DSA", credit:4},
      {name:"Objected Oriented Programming", credit:4},
      {name:"Digital Electronics and Logic Design", credit:4},
      {name:"Economics For Engineers", credit:2},
      {name:"DSA Lab", credit:2},
      {name:"Digial Lab", credit:2},
    ]
  },
  EEE: {
    1: [
      {name:"Maths I", credit:3},
      {name:"Physics", credit:4},
      {name:"Engineering Graphics", credit:3},
      {name:"IEEE", credit:4},
      {name:"Algorithimic Thinking with Python", credit:4},
      {name:"Basic Electrical and Electronics Workshop", credit:1}
    ],
    2: [
      {name:"Maths II", credit:3},
      {name:"Chemistry", credit:4},
      {name:"Engineering Mechanics", credit:3},
      {name:"Programming in C", credit:4},
      {name:"Measurement and Instrumentation", credit:4},
      {name:"Enginnering Entreprenership & IPR", credit:3},
      {name:"IT Workshop", credit:1}
    ],
    3: [
      {name:"Maths III", credit:3},
      {name:"Circuit and Network", credit:4},
      {name:"DC Machines and Transformers", credit:4},
      {name:"Analog Electronics", credit:4},
      {name:"AI&DS", credit:4},
      {name:"EE&SD", credit:2},
      {name:"Circuits and Measurement Lab", credit:2},
      {name:"Analog Electronics Lab", credit:2},
    ]
  },
  ECE: {
    1: [
      {name:"Maths I", credit:3},
      {name:"Physics", credit:4},
      {name:"Engineering Graphics", credit:3},
      {name:"IEEE", credit:4},
      {name:"Algorithimic Thinking with Python", credit:4},
      {name:"Basic Electrical and Electronics Workshop", credit:1}
    ],
    2: [
      {name:"Maths II", credit:3},
      {name:"Chemistry", credit:4},
      {name:"FOC", credit:3},
      {name:"Programming in C", credit:4},
      {name:"Network Analysis", credit:4},
      {name:"Enginnering Entreprenership & IPR", credit:3},
      {name:"IT Workshop", credit:1}
    ],
    3: [
      {name:"Maths III", credit:3},
      {name:"Solid State Devices", credit:4},
      {name:"Analog Circuits", credit:4},
      {name:"Logic Circuits Design", credit:4},
      {name:"AI&DS", credit:4},
      {name:"EE&SD", credit:2},
      {name:"Analog Circuits Lab", credit:2},
      {name:"Logic Circuits Design Lab", credit:2},
    ]
  },
  MECH: {
    1: [
      {name:"Maths I", credit:3},
      {name:"Chemistry", credit:4},
      {name:"Engineering Mechanics", credit:3},
      {name:"IM&CE", credit:4},
      {name:"Algorithimic Thinking with Python", credit:4},
      {name:"Engineering Workshop", credit:1}
    ],
    2: [
      {name:"Maths II", credit:3},
      {name:"Physics", credit:4},
      {name:"Engineering Graphics", credit:3},
      {name:"BEEE", credit:4},
      {name:"Material Science and Engineering", credit:4},
      {name:"Enginnering Entreprenership & IPR", credit:3},
      {name:"Basic Electrical and Electronics Workshop", credit:1}
    ],
    3: [
      {name:"Maths III", credit:3},
      {name:"Mechanics Of Solids", credit:4},
      {name:"Fluid Mechanics and Machinery", credit:4},
      {name:"Manufacturing Processes", credit:4},
      {name:"AI&DS", credit:4},
      {name:"Economics For Engineers", credit:2},
      {name:"CAD Lab", credit:2},
      {name:"Material Testing Lab", credit:2},
    ]
  },
  CIVIL: {
    1: [
      {name:"Maths I", credit:3},
      {name:"Chemistry", credit:4},
      {name:"Engineering Mechanics", credit:3},
      {name:"IM&CE", credit:4},
      {name:"Algorithimic Thinking with Python", credit:4},
      {name:"Engineering Workshop", credit:1}
    ],
    2: [
      {name:"Maths II", credit:3},
      {name:"Physics", credit:4},
      {name:"Engineering Graphics", credit:3},
      {name:"BEEE", credit:4},
      {name:"Mechanics Of Solids", credit:4},
      {name:"Enginnering Entreprenership & IPR", credit:3},
      {name:"Basic Electrical and Electronics Workshop", credit:1}
      
    ],
    3: [
      {name:"Maths III", credit:3},
      {name:"Fluid Mechanics", credit:4},
      {name:"Structural Analysis-1", credit:4},
      {name:"Surveying & Geomatics", credit:4},
      {name:"AI&DS", credit:4},
      {name:"Economics For Engineers", credit:2},
      {name:" Survey Lab", credit:2},
      {name:"Fluid Mechanics Lab", credit:2},
    ]
  }
};


  function createRow(subject = "", credit = "", fixed=false) {
    const tr = document.createElement("tr");
    if(fixed){
      tr.innerHTML = `
        <td>${subject}</td>
        <td>${credit}</td>
        <td><select required>${gradeOptions}</select></td>
      `;
    } else {
      tr.innerHTML = `
        <td><input type="text" placeholder="Subject Name" value="${subject}" required></td>
        <td><input type="number" min="1" max="4" placeholder="Credits (1–4)" value="${credit}" required></td>
        <td><select required>${gradeOptions}</select></td>
      `;
    }
    container.appendChild(tr);

    const inputs = tr.querySelectorAll("input, select");
    inputs.forEach(inp => {
      inp.addEventListener("input", updateCalcButtonState);
      inp.addEventListener("change", updateCalcButtonState);
    });
  }

  function loadSubjects() {
    const branch = branchSelect.value;
    const sem = parseInt(semesterSelect.value);
    container.innerHTML = "";
    subjectsTable.style.display = "none";
    addBtn.style.display = "none";
    calcBtn.disabled = true;

    if (!branch || !sem) return;

    if (subjectsData[branch] && subjectsData[branch][sem]) {
      subjectsData[branch][sem].forEach(sub => createRow(sub.name, sub.credit, true));
    } else {
      createRow();
      addBtn.style.display = "block";
    }
    subjectsTable.style.display = "table";
  }

  function updateCalcButtonState() {
    const rows = container.querySelectorAll("tr");
    let allFilled = rows.length > 0;
    rows.forEach(row => {
      row.querySelectorAll("input,select").forEach(inp => {
        if(!inp.value) allFilled=false;
      });
    });
    calcBtn.disabled = !allFilled;
  }

  branchSelect.addEventListener("change", loadSubjects);
  semesterSelect.addEventListener("change", loadSubjects);
  addBtn.addEventListener("click", () => { createRow(); updateCalcButtonState(); });

  calcBtn.addEventListener("click", () => {
    summaryBody.innerHTML = "";
    let totalCredits = 0, totalPoints = 0;

    container.querySelectorAll("tr").forEach(row => {
      const subject = row.querySelector("input[type=text]") ? row.querySelector("input[type=text]").value : row.cells[0].textContent;
      const credit = row.querySelector("input[type=number]") ? parseFloat(row.querySelector("input[type=number]").value) : parseFloat(row.cells[1].textContent);
      const gradeVal = parseFloat(row.querySelector("select").value);

      totalCredits += credit;
      totalPoints += credit * gradeVal;

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${subject}</td><td>${credit}</td><td>${row.querySelector("select").selectedOptions[0].text}</td>`;
      summaryBody.appendChild(tr);
    });

    const sgpa = totalPoints / totalCredits;
    displaySem.textContent = `Semester ${semesterSelect.value}`;
    displayBranch.textContent = branchSelect.value;
    resultDiv.textContent = `Your SGPA: ${sgpa.toFixed(2)}`;
    summary.classList.remove("hidden");
    exportBtn.classList.remove("hidden");
    clearBtn.classList.remove("hidden");
  });

  exportBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(255,255,255);
    doc.setFillColor(74,71,163);
    doc.rect(0,0,210,20,"F");
    doc.text("SGPA REPORT",105,14,null,null,"center");
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Branch: ${displayBranch.textContent}`,20,30);
    doc.text(`Semester: ${displaySem.textContent}`,150,30);

    const tableData = [];
    summaryBody.querySelectorAll("tr").forEach(r=>{
      const cols = r.querySelectorAll("td");
      tableData.push([cols[0].textContent, cols[1].textContent, cols[2].textContent]);
    });

    doc.autoTable({
      startY:40,
      head:[['Subject','Credits','Grade']],
      body: tableData,
      headStyles:{fillColor:[74,71,163],textColor:255,fontStyle:'bold'},
      alternateRowStyles:{fillColor:[240,240,255]},
      columnStyles:{0:{cellWidth:100},1:{cellWidth:35, halign:'center'},2:{cellWidth:35, halign:'center'}},
      styles:{font:'helvetica',fontSize:12,halign:'center'}
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica","bold");
    doc.setFontSize(14);
    doc.setTextColor(34,139,34);
    doc.text(resultDiv.textContent,105,finalY,null,null,"center");

    doc.setFont("helvetica","italic");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Created by: Vaishnav SV | Gmail: vaishnavsv123@gmail.com | Instagram: @vaishnav_sv",105,290,null,null,"center");

    doc.save(`${displayBranch.textContent}_Sem${semesterSelect.value}_SGPA.pdf`);
  });

  clearBtn.addEventListener("click", () => {
    branchSelect.value = "";
    semesterSelect.value = "";
    container.innerHTML = "";
    subjectsTable.style.display = "none";
    summary.classList.add("hidden");
    exportBtn.classList.add("hidden");
    clearBtn.classList.add("hidden");
    calcBtn.disabled = true;
  });
});
