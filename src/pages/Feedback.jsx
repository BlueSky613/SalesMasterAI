import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import HighchartsWordCloud from 'highcharts/modules/wordcloud';
import HighchartsSpider from 'highcharts/modules/solid-gauge';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsMore from 'highcharts/highcharts-more';
import FeedbackMessage from '../component/FeedbackMessage';

export default function Feedback() {

    HighchartsWordCloud(Highcharts);
    HighchartsMore(Highcharts);
    HighchartsSolidGauge(Highcharts);
    HighchartsSpider(Highcharts);


    const wordOptions = {
        chart: {
            type: "wordcloud"
        },
        series: [{
            data: [{ name: "こんにちは", weight: 1 }],
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

    const options = {
        chart: {
            polar: true,
            type: 'line'
        },
        title: {
            text: '営業力評価'
        },
        xAxis: {
            categories: ['提案力', 'ヒアリング力', '共感力', '交渉力', 'プレゼン力'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            max: 6,
            min: 0,
            title: {
                text: ''
            }
        },
        series: [{
            name: '',
            data: [2, 2, 2, 2, 2],
            pointPlacement: 'on'
        }]
    };

    return (
        <div>
            <h2>
                総評 / 田中一郎(45)
                <p></p>
                <div id='pdf-container'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '400px', width: '100%' } }} />
                    <HighchartsReact highcharts={Highcharts} options={wordOptions} containerProps={{ style: { height: '600px', width: '100%' } }} />
                    <FeedbackMessage id="feedback-message-good" textId='feedback-text-good' title='良い点' opacity='0' />
                    <FeedbackMessage id="feedback-message-bad" textId='feedback-text-bad' title='改善できる点' opacity='0' />
                    <FeedbackMessage id="feedback-message-comment" textId='feedback-text-comment' title='総評' opacity='0' />
                    <FeedbackMessage id="feedback-message-others" textId='feedback-text-others' title='総評' opacity='1' comment='帰ってくれ。' />
                </div>
                <div className='buttons'>
                    <div className='button1'>
                        <button className='button-pdf' id='generate-id'>PDF出力</button>
                        <button className='button-chat' id='chat'>チャットへ</button>
                    </div>
                    <div className='button2'>
                        <button className='button-share' id='share'>共有</button>
                    </div>
                    <div className='button2'>
                        <button className='button-back' id='back'>戻る</button>
                    </div>
                </div>
            </h2>
        </div>
    )
}
