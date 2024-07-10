import React, { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import HighchartsWordCloud from 'highcharts/modules/wordcloud';
import HighchartsSpider from 'highcharts/modules/solid-gauge';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsMore from 'highcharts/highcharts-more';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { html2pdf } from 'html2pdf.js';
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Feedback() {

    HighchartsWordCloud(Highcharts);
    HighchartsMore(Highcharts);
    HighchartsSolidGauge(Highcharts);
    HighchartsSpider(Highcharts);

    const params = useParams()
    const location = useLocation()

    const uuid = params.product_id
    const name = location.state.name
    const age = location.state.age
    const [good, setGood] = useState([])
    const [bad, setBad] = useState([])
    const [active, setActive] = useState([])
    const [word, setWord] = useState([])
    const [total, setTotal] = useState('')
    const [mark, setMark] = useState('')
    const navigate = useNavigate()

    const contentRef = useRef(null);

    const getEval = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/v1/confirminfo/?uuid=${uuid}&&feedback=${true}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${localStorage.getItem('token')}`,
                }
            },
            );
            if (response.status === 200) {
                setWord([])
                setGood(response.data['good_point'].trim().split(','))
                setGood(prevArray => prevArray.slice(1))
                setBad(response.data['bad_point'].split(','))
                setBad(prevArray => prevArray.slice(1))
                setTotal(response.data['total_mark'])
                setMark(response.data['mark'])
                setActive(response.data['active_mark'].match(/\d+/g))
                const rawwords = response.data['active_mark']
                const endActive = rawwords.indexOf('総合コミュニケーション:') + 14
                const words = rawwords.slice(endActive).replace(/\n/g, '').split(',')
                console.log(words)
                for (let i = 0; i < words.length; i++) {
                    setWord(prevArray => [...prevArray, { name: words[i].split(':')[0], weight: parseInt(words[i].split(':')[1]) }])
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEval()
    }, [])

    const handlePrint = async () => {
        const canvas = await html2canvas(contentRef.current, { scale: 0.5, useCORS: true, allowTaint: true })
            const image = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(image, 'png', 0, 0)
            pdf.save(`${uuid}.pdf`)
    }

    const handleBack = (e) => {
        e.preventDefault()
        navigate('/chat')
    }

    const handleChat = (e) => {
        navigate(`/chat/${uuid}`, { state: { name: name, disabled: 'feedback' } })
    }

    const wordOptions = {
        chart: {
            type: "wordcloud"
        },
        series: [{
            // data: [{name:'123', weight: 1}, {name:'123', weight: 1}],
            data: word,
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
            data: [active.map(Number)[0], active.map(Number)[1], active.map(Number)[2], active.map(Number)[3], active.map(Number)[4]],
            pointPlacement: 'on'
        }]
    };

    return (
        <div>
            <h2>
                総評 / {name}({age})
                <p></p>
                <div id='pdf-container' ref={contentRef}>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '400px', width: '100%' } }} />
                    <HighchartsReact highcharts={Highcharts} options={wordOptions} containerProps={{ style: { height: '600px', width: '100%' } }} />
                    <div id="feedback-message-good">
                        <h2>良い点</h2>
                        {
                            good.map((item, index) => {
                                return item === '良かった点：' ? null : <p key={index}>・{item}</p>
                            })
                        }
                    </div>
                    <div id="feedback-message-bad">
                        <h2>改善できる点</h2>
                        {
                            bad.map((item, index) => {
                                return item === '悪かった点：' ? null : <p key={index}>・{item}</p>
                            })
                        }
                    </div>
                    <div id="feedback-message-comment">
                        <h2>総評</h2>
                        <p>{total}</p>
                        <p>{mark.includes('点') ? mark : mark + '点'}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='button1'>
                        <button className='button-pdf' id='generate-id' onClick={handlePrint}>PDF出力</button>
                        <button className='button-chat' id='chat' onClick={handleChat}>チャットへ</button>
                    </div>
                    <div className='button2'>
                        <button className='button-share' id='share'>共有</button>
                    </div>
                    <div className='button2'>
                        <button className='button-back' id='back' onClick={handleBack}>戻る</button>
                    </div>
                </div>
            </h2>
        </div>
    )
}
