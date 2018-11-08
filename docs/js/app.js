// VARIÁVEIS GLOBAIS
let dashboard = document.querySelector(".dashboard");
let sedesSelection = document.querySelector(".sedes-selection");
let content = document.querySelector("#content");
let logout = document.querySelector("#logout");
let contentPage = document.querySelector("#content");
let alunas = document.querySelector("#alunas")

function displayChange(add, remove) {
  add.classList.remove("none");
  remove.classList.add("none");
}

// SELEÇÃO DE SEDE
let itemList = document.getElementsByClassName("itemList");
for (x in itemList) {
  itemList[x].onclick = (e) => {
    dashboard.classList.remove("none");
    sedesSelection.classList.add("none");
    dashboardInfo(e.target.dataset.sede, e.target.dataset.turma);
  };
}

document.querySelector("#sedes").onclick = () => {
  displayChange(sedesSelection, dashboard);
};

document.querySelector("#logout").onclick = () => {
  window.location = "index.html";
};

document.querySelector("#students").onclick = (e) => {
  e.target.style.backgroundColor = "#ffc107";
  document.querySelector("#dash").style.backgroundColor = "#f2f2f2"
  contentPage.style.display = "none";
  alunas.style.display = "flex";
};

document.querySelector("#dash").onclick = (e) => {
  e.target.style.backgroundColor = "#ffc107";
  document.querySelector("#students").style.backgroundColor = "#f2f2f2"
  contentPage.style.display = "flex";
  alunas.style.display = "none";
};

// GRÁFICOS
function drawChart(activeStudents, dropoutStudents) {
  let chart = new google.visualization.PieChart(document.getElementById('piechart'));
  let data = google.visualization.arrayToDataTable([
    ['Status', 'Total'],
    ['Ativas', activeStudents],
    ['Desistencias', dropoutStudents]
  ])
  let options = {
    title: 'Total de alunas: ' + (activeStudents + dropoutStudents).toString(),
    backgroundColor: "transparent",
    chartArea: { width: '100%', height: '90%' },
    is3D: true,
    slices: {
      0: { color: '#4B5E74' },
      1: { color: '#BB927B' }
    }
  };
  chart.draw(data, options);
}

// GRÁFICO ALUNAS QUE EXCEDEM A META
function drawChartTargetStudents(targetStudents, nottargetStudents, sprints, std) {
  var chart = new google.visualization.PieChart(document.getElementById('targetStudents-chart'));
  var data = google.visualization.arrayToDataTable([
    ['Status', 'Total'],
    ['Excedem a meta (alunas ativas)', Math.round(targetStudents)],
    ['Não excedem (alunas ativas)', Math.round(nottargetStudents / sprints)]
  ]);
  var options = {
    title: 'Total de alunas: ' + (Math.round(std)).toString(),
    backgroundColor: "transparent",
    chartArea: { width: '100%', height: '90%' },
    pieHole: 0.5,
    slices: {
      0: { color: '#AC5F4C' },
      1: { color: '#67837C' }
    }
  };
  chart.draw(data, options);
}

// GRÁFICO NPS
function drawStacked(nps, promoters, passive, detractors) {
  let data = google.visualization.arrayToDataTable([
    ['Name', '%', { role: 'style' }],
    ['NPS', nps, "#4B5E74"],
    ['Promoters', promoters, "#BB927B"],
    ['Passive', passive, "#AC5F4C"],
    ['Detractors', detractors, "#67837C"]
  ]);

  let options = {
    chartArea: { width: '60%', height: '90%' },
    isStacked: true,
    backgroundColor: "transparent",
    legend: {
      position: "none"
    }
  };
  let chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
// GRÁFICO TECH SCORE
function drawChartTech(scoreTech, scoreTechNot, sprints) {
  let chart = new google.visualization.PieChart(document.getElementById('tech-chart'));
  let data = google.visualization.arrayToDataTable([
    ['Status', 'Total'],
    ['Atingem (alunas ativas)', Math.round(scoreTech / sprints)],
    ['Não atingem (alunas ativas)', Math.round(scoreTechNot / sprints)]
  ])
  let options = {
    title: 'Total de alunas: ',
    backgroundColor: "transparent",
    chartArea: { width: '100%', height: '90%' },
    is3D: true,
    slices: {
      0: { color: '#AC5F4C' },
      1: { color: '#67837C' }
    }
  };
  chart.draw(data, options);
}
// GRÁFICO HSE SCORE
function drawChartHSE(scoreHSE, scoreHSENot, sprints) {
  let chart = new google.visualization.PieChart(document.getElementById('hse-chart'));
  let data = google.visualization.arrayToDataTable([
    ['Status', 'Total'],
    ['Atingem (alunas ativas)', Math.round(scoreHSE / sprints)],
    ['Não atingem (alunas ativas)', Math.round(scoreHSENot / sprints)]
  ])
  let options = {
    title: 'Total de alunas: ',
    backgroundColor: "transparent",
    chartArea: { width: '100%', height: '90%' },
    is3D: true,
    slices: {
      0: { color: '#4B5E74' },
      1: { color: '#BB927B' }
    }
  };
  chart.draw(data, options);
}
// GRÁFICO DE SATISFAÇÃO DAS ALUNAS
function drawSatisfaction(reaches, doesntReach, overcomes, sprints) {
  let data = google.visualization.arrayToDataTable([
    ['Satisfação Laboratória', 'Cumpre', { role: 'style' }, 'Não cumpre', { role: 'style' }, 'Supera', { role: 'style' }],
    ['Satisfação', reaches / sprints, "#4B5E74", doesntReach / sprints, "#BB927B", overcomes / sprints, "#AC5F4C"]
  ]);
  let options = {
    title: 'A Laboratoria cumpre suas expectativas?',
    chartArea: { width: '90%' },
    isStacked: "percent",
    backgroundColor: "transparent",
    legend: { position: 'none' },
  };
  let chart = new google.visualization.BarChart(document.getElementById('chart-satisfaction'));
  chart.draw(data, options);
}
// GRÁFICO MÉDIA MENTORES
function mentorsChart(ratingTeacher, sprints) {
  let data = google.visualization.arrayToDataTable([
    ['Média', 'Pontuação máxima', 'Pontuação mentores'],
    ['Pontuação', (5.0).toFixed(1), ratingTeacher / sprints],
  ]);
  let options = {
    backgroundColor: "transparent",
    bars: 'vertical',
    vAxis: { format: 'decimal' },
    height: 260,
    colors: ['#AC5F4C', '#67837C'],
  };
  let chart = new google.charts.Bar(document.getElementById('mentor-chart'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
// GRÁFICO MÉDIA JEDI
function jediChart(ratingJedi, sprints) {
  let data = google.visualization.arrayToDataTable([
    ['Média', 'Pontuação máxima', 'Pontuação mentores'],
    ['Pontuação', (5.0).toFixed(1), (ratingJedi / sprints)],
  ]);
  let options = {
    backgroundColor: "transparent",
    bars: 'vertical',
    vAxis: { format: 'decimal' },
    height: 260,
    colors: ['#4B5E74', '#BB927B'],
  };
  let chart = new google.charts.Bar(document.getElementById('jedi-chart'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
// ENVIANDO INFORMAÇÕES PARA DASHBOARD
function dashboardInfo(sd, trm) {
  let studentStatus = {
    active: 0,
    dropout: 0,
    targetNot: 0,
    target: 0,
  }
  let score = {
    tech: 0,
    techNot: 0,
    hse: 0,
    hseNot: 0
  }
  let rating = {
    promoters: 0,
    passive: 0,
    detractors: 0,
    totalNps: 0,
    reaches: 0,
    doesntReach: 0,
    overcomes: 0,
    teacher: 0,
    jedi: 0
  }
  let sprints = 0;
  let sprint = 0;
  let std = data[sd][trm]["students"];
  let ratings = data[sd][trm]["ratings"];
  // DADOS DAS ESTUDANTES
  for (i in std) {
    if (std[i]["active"] === true) { studentStatus.active += 1; }
    else if (std[i]["active"] === false) { studentStatus.dropout += 1; }

    for (j in std[i]["sprints"]) {
      (std[i]["sprints"][j]["score"]["tech"] >= 1260) ? score.tech += 1 : score.techNot += 1;
      (std[i]["sprints"][j]["score"]["hse"] >= 840) ? score.hse += 1 : score.hseNot += 1;
      (std[i]["sprints"][j]["score"]["tech"] >= 1260 && std[i]["sprints"][j]["score"]["hse"] >= 840) ? studentStatus.target += 1 : studentStatus.targetNot += 1;
    }

    sprint = std[i]["sprints"];
    sprints = std[i]["sprints"].length;
  }
  studentStatus.target = Math.round(studentStatus.target / sprints);
  studentStatus.targetNot = Math.round(studentStatus.targetNot / sprints);
  if (isNaN(studentStatus.target)) {
    studentStatus.target = 0;
  }
  // DADOS DE AVALIAÇÕES
  for (i in ratings) {
    rating.totalNps = ratings[i]["nps"]["promoters"] - ratings[i]["nps"]["detractors"];
    rating.promoters = ratings[i]["nps"]["promoters"];
    rating.passive = ratings[i]["nps"]["passive"];
    rating.detractors = ratings[i]["nps"]["detractors"];
    rating.reaches += data[sd][trm]["ratings"][i]["student"]["cumple"];
    rating.doesntReach += data[sd][trm]["ratings"][i]["student"]["no-cumple"];
    rating.overcomes += data[sd][trm]["ratings"][i]["student"]["supera"];
    rating.teacher += data[sd][trm]["ratings"][i]["teacher"];
    rating.jedi += data[sd][trm]["ratings"][i]["jedi"];
  }
  drawChart(studentStatus.active, studentStatus.dropout);
  drawChartTargetStudents(studentStatus.target, studentStatus.targetNot, sprints, std.length);
  drawStacked(rating.totalNps, rating.promoters, rating.passive, rating.detractors);
  drawChartTech(score.tech, score.techNot, sprints);
  drawChartHSE(score.hse, score.hseNot, sprints);
  drawSatisfaction(rating.reaches, rating.doesntReach, rating.overcomes, sprints);
  mentorsChart(rating.teacher, sprints);
  jediChart(rating.jedi, sprints);
  studentsStatus(sd, trm, std, ratings, studentStatus.target, studentStatus.active, studentStatus.dropout);
  npsPercentual(rating.totalNps, rating.promoters, rating.passive, rating.detractors);
  studentsSatisfaction(rating.overcomes, rating.reaches, sprints);
  teacherRating(rating.teacher, rating.jedi, sprints);
  techScore(score.tech, std.length, sprint, sprints);
  hseScore(score.hse, std.length, sprint, sprints);
  alunasPage(std);
}

function alunasPage(std) {
  for (i in std) {
    let box = document.createElement("div");
    box.classList.add("box");
    alunas.appendChild(box);
    let name = document.createElement("h1");
    name.textContent = std[i]["name"];
    box.appendChild(name);
    let img = document.createElement("img");
    img.src = std[i]["photo"];
    img.style.width = "120px";
    img.style.height = "120px";
    img.style.margin = "0 auto";
    box.appendChild(img);
    let active = document.createElement("p");
    (std[i]["active"] === "true") ? active.textContent = "ATIVA" : active.textContent = "INATIVA";
    box.appendChild(active);
    for (j in std[i]["sprints"]) {
      let sprint = document.createElement("p");
      sprint.textContent = "Sprint " + std[i]["sprints"][j]["number"];
      sprint.classList.add("info-box");
      sprint.style.margin = "10px auto";
      let tech = document.createElement("p");
      tech.textContent = "TECH: " + std[i]["sprints"][j]["score"]["tech"];
      let hse = document.createElement("p");
      hse.textContent = "HSE: " + std[i]["sprints"][j]["score"]["hse"];
      box.appendChild(sprint);
      box.appendChild(tech);
      box.appendChild(hse);
    }
  }
}
function studentsStatus(sd, trm, std, ratings, targetStudents, activeStudents, dropoutStudents) {
  document.getElementsByClassName("info")[0].textContent = activeStudents;
  document.getElementsByClassName("info")[1].textContent = (dropoutStudents / data[sd][trm]["students"].length * 100).toFixed(1) + "%";
  document.getElementsByClassName("info")[2].textContent = targetStudents;
  document.getElementsByClassName("info")[3].textContent = (targetStudents / std.length * 100).toFixed(1) + "%";
}
function npsPercentual(totalNps, promoters, passive, detractors) {
  document.getElementsByClassName("info")[4].textContent = totalNps + "%";
  document.getElementsByClassName("info-label")[0].textContent = promoters + "% Promoters";
  document.getElementsByClassName("info-label")[1].textContent = passive + "% Passive";
  document.getElementsByClassName("info-label")[2].textContent = detractors + "% Detractors";
}
function techScore(scoreTech, totalStudents, sprint, sprints) {
  document.getElementsByClassName("info")[6].textContent = Math.round(scoreTech / sprints);
  document.getElementsByClassName("info")[7].textContent = ((scoreTech / sprints) / totalStudents * 100).toFixed(1) + "%";
}
function hseScore(scoreHSE, totalStudents, sprint, sprints) {
  document.getElementsByClassName("info")[8].textContent = Math.round(scoreHSE / sprints);
  document.getElementsByClassName("info")[9].textContent = ((scoreHSE / sprints) / totalStudents * 100).toFixed(1) + "%";
}
function studentsSatisfaction(overcomes, reaches, sprints) {
  document.getElementsByClassName("info")[10].textContent = ((overcomes + reaches) / sprints).toFixed(1) + "%";
}
function teacherRating(ratingTeacher, ratingJedi, sprints) {
  document.getElementsByClassName("info")[11].textContent = (ratingTeacher / sprints).toFixed(1);
  document.getElementsByClassName("info")[12].textContent = (ratingJedi / sprints).toFixed(1);
}
// GRÁFICOS
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawStacked);
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChartTech);
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChartHSE);
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawSatisfaction);
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(mentorsChart);
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(jediChart);
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChartTargetStudents);