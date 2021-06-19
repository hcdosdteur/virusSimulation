import { Chart, registerables } from 'chart.js'
import { menuBtn_click } from './variable'
import { NumOfPeople, barDiv, barGraph, barGraph_btn } from './constants'

Chart.register(...registerables);

const n = NumOfPeople.wholePer;

export function init(){
    const barC = new Chart(barGraph, {
        type: 'bar',
        data: {
            labels: ['S', 'I', 'R'],
            datasets: [{
                label: 'bar_Graph',
                data: [NumOfPeople.wholePer, NumOfPeople.Infectious, NumOfPeople.Resistent],
                backgroundColor: [
                    'rgba(99, 255, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(99, 255, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,
                    max: NumOfPeople.wholePer
                }
            }
        }
    });

    barC.hide(0)
    setInterval(()=>{
        updateChart(barC)
        if(menuBtn_click.main == false){
            barDiv.style.display = 'none';
            barC.hide(0)
            menuBtn_click.bar = false;
        }
    }, 60)

    barGraph_btn.addEventListener('click', function(){
        if(menuBtn_click.bar == false){
            barDiv.style.display = 'block';
            barDiv.style.zIndex = barDiv.style.zIndex + 1;
            barC.show(0)
            menuBtn_click.line = false;
            menuBtn_click.bar = true;
        }else{
            barDiv.style.display = 'none';
            barDiv.style.zIndex = '150';
            barC.hide(0)
            menuBtn_click.bar = false;
        }
    });
    if(menuBtn_click.main == true){
        barDiv.style.display = 'none';
        barC.hide(0)
        menuBtn_click.bar = false;
    }
    
    function updateChart(chart:Chart<"bar", number[], string>) {
        chart.data.datasets[0].data = [NumOfPeople.wholePer, NumOfPeople.Infectious, NumOfPeople.Resistent];
        chart.update();
    }
}