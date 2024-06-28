import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import HighchartsWordCloud from 'highcharts/modules/wordcloud';

export default function Home() {

    HighchartsWordCloud(Highcharts);

    const feedbackOptions = {
        chart: {
            type: 'line'
        },
        title: {
            text: '直近の点数',
            align: 'left'
        },
        xAxis: {
            title: {
                text: ''
            },
            tickInterval: 1,
            min: 0.5,
            max: 3.5
        },
        yAxis: {
            title: {
                text: '点数',
            },
            min: 0,
            max: 12
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color};font-size:20px;">\u25CF</span> {series.name}: <b>{point.y}</b>'
        },
        series: [
            {
                name: '点数',
                pointStart: 1,
                data: [0, 10, 7]
            }
        ]
    };

    const wordCloudData = { "\u3042\u308b": 1, "\u304a\u9858\u3044": 1, "\u3053\u3093\u306b\u3061\u306f": 1, "\u3057\u3066": 1, "\u3057\u307e\u3044": 1, "\u305d\u3046": 1, "\u3067\u3059\u304b": 1, "\u3067\u3059\u304c": 1, "\u306e": 1, "\u3088\u308d\u3057\u3044": 1, "\u3088\u308d\u3057\u304f": 1, "\u5618": 1, "\u5bdd\u574a": 1, "\u672c\u65e5": 2, "\u76f8\u8ac7": 1, "\u81f4\u3057\u307e\u3059": 1, "\u9045\u523b": 1 };

    let formattedData = [];

    for (let word in wordCloudData) {
        formattedData.push({ name: word, weight: wordCloudData[word] });
    }

    const wordOptions = {
        chart: {
            type: "wordcloud"
        },
        series: [{
            data: formattedData,
            name: '使用回数',
            className: 'wordcloud-series'
        }],
        title: {
            text: '営業時の単語クラウド',
            align: 'left',
            style: {
                color: '#333',
                fontFamily: 'Noto Sans JP'
            }
        },
        subtitle: {
            text: '営業時の単語の頻度',
            align: 'left',
        },
        tooltip: {
            headerFormat: '<span style="font-size: 25px"><b>{point.key}</b></span><br>'
        }
    };

    const openTab = (index) => {
        if (index === 0) {
            document.getElementById("feedbacks").style.display = 'block';
            document.getElementById("words-btn").classList.remove("tablinks-active");
            document.getElementById("feedbacks-btn").classList.add("tablinks-active");
            document.getElementById("words").style.display = 'none';
        }
        else {
            document.getElementById("words").style.display = 'block';
            document.getElementById("words-btn").classList.add("tablinks-active");
            document.getElementById("feedbacks").style.display = 'none';
            document.getElementById("feedbacks-btn").classList.remove("tablinks-active");
        }
    }

    return (
        <div className="flex-box">
            <div className="right-side">
                <div className="tabs">
                    <button id="feedbacks-btn" className="tablinks tablinks-active" onClick={() => openTab(0)}>
                        フィードバック
                    </button>
                    <button id="words-btn" className="tablinks" onClick={() => openTab(1)}>
                        使用単語
                    </button>
                </div>
                <div id="feedbacks" className="tabcontent" style={{ display: "block" }}>
                    <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={feedbackOptions}
                        />
                    </div>
                </div>
                <div id="words" className="tabcontent" style={{ display: "none" }}>
                    <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={wordOptions}
                        />
                    </div>
                </div>
                <div id="tokens">
                    <p className="tokens-used">使用トークン: 49,833</p>
                    <p className="tokens-available">※利用可能トークン: 2,000,000</p>
                </div>
            </div>
            <div className="left-side">
                <div id="ranking">
                    <h2>ランキング</h2>
                    <div id="group-select-container">
                        <p>グループを選択:</p>
                        <select id="group-select">
                            <option value="none">
                                選択してください
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
