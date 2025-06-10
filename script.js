const mapa = L.map('mapa').setView([-23.4273, -51.9375], 13) //coordenadas de mga, e zoom inicial 13

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 50,
}).addTo(mapa); //layer do mapa

//os dados coletados dos boletim de ocorrêncoa em formato JSON
const crimes = [
  { tipo: 'Furto', local: [-23.4235, -51.9332], gravidade: 'média' },
  { tipo: 'Roubo', local: [-23.4260, -51.9200], gravidade: 'alta' },
  { tipo: 'Agressão', local: [-23.4300, -51.9400], gravidade: 'baixa' },
  { tipo: 'Furto', local: [-23.4255, -51.9280], gravidade: 'média' },
];

//switch case pra atribuir cores as gravidades
function corPorGravidade(gravidade) {
  switch (gravidade) {
    case 'alta': return 'red';
    case 'média': return 'orange';
    case 'baixa': return 'green';
    default: return 'blue';
  }
}


let marcadores = [];

function limparMarcadores(){
    marcadores.forEach(m => mapa.removeLayer(m));
    marcadores = [];
}

function exibirCrimes(tipoSelecionado) {
  limparMarcadores();

  crimes.forEach(crime => {
    if (tipoSelecionado === 'todos' || crime.tipo === tipoSelecionado) {
      const marker = L.circleMarker(crime.local, {
        radius: 10,
        color: corPorGravidade(crime.gravidade),
        fillOpacity: 0.7
      }).addTo(mapa).bindPopup(`<strong>Tipo:</strong> ${crime.tipo}<br><strong>Gravidade:</strong> ${crime.gravidade}`);

      marcadores.push(marker);
    }
  });
}

exibirCrimes('todos');

document.getElementById('filtroCrimes').addEventListener('change', (e) => {
  exibirCrimes(e.target.value);
});