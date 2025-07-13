// 📁 src/adminpage/adminpage/UserChart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats-eleves")
      .then(res => setData(res.data))
      .catch(err => console.error("Erreur statistiques :", err));
  }, []);

  // Génère une couleur aléatoire pour chaque barre
  const generateColors = (length) => {
    const colors = ['#8a5adf', '#fbc75d', '#4bc0c0', '#ff6384', '#36a2eb', '#ff9f40', '#9966ff', '#00a676'];
    return Array.from({ length }, (_, i) => colors[i % colors.length]);
  };

  const niveaux = data.map(row => row.niveau);
  const nombreColors = generateColors(niveaux.length);
  const scoreColors = generateColors(niveaux.length).reverse(); // une autre palette pour l'autre dataset

  const chartData = {
    labels: niveaux,
    datasets: [
      {
        label: 'عدد التلاميذ',
        data: data.map(row => row.nombre),
        backgroundColor: nombreColors,
      },
      {
        label: 'المعدل العام',
        data: data.map(row => row.score_moyen),
        backgroundColor: scoreColors,
      }
    ]
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">📈 إحصائيات التلاميذ حسب المستوى</h3>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'توزيع الطلاب' }
        }
      }} />
    </div>
  );
};

export default UserChart;
