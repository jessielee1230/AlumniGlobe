window.onload = () => {
    let EC = echarts.init(document.querySelector('.EC'))
    let canvas = document.createElement('canvas');
    // Earth Texture
    let mapChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
    });
    mapChart.setOption({
        series: [{
            type: 'map',
            map: 'world',
            // Set Full Size of Echarts Example
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boundingCoords: [
                [-180, 90],
                [180, -90]
            ]
        }]
    });
    let option = {

        //Headline
        title: {
            text: 'MIDEA 10 Years',
            textStyle: {
                color: '#fff'
            }
        },

        //Set Canvas's Background Colour
        backgroundColor: '#333',

        tooltip: {
            show: true
        },

        visualMap: [{
            // show: false,
            type: 'continuous',
            seriesIndex: 0,
            text: ['scatter3D'],
            textStyle: {
                color: '#fff'
            },
            calculable: true,
            max: 3000,
            inRange: {
                color: ['#87aa66', '#eba438', '#d94d4c']
            }
        }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            calculable: true,
            max: 3000,
            inRange: {
                color: ['#87aa66', '#eba438', '#d94d4c']
            }
        }],

        // Customize the 3D Globe

        globe: {
            baseTexture: mapChart,

            // environment: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
            //     offset: 1, color: '#000000' // Sky
            // }, {
            //     offset: 0, color: '#000000' // Earth
            // }, {
            //     offset: 0, color: '#000000' // Earth
            // }], true),

            //shading: 'lambert',

            light: { // Shadow of Lights
                main: {
                    color: '#ffbc58', // Color of Lights
                    intensity: 1.2, // Intensity of Lights, 1.2
                    shadowQuality: 'high', // The light of shadow
                    shadow: true, // Show shadow or not
                    alpha: 40,
                    beta: -30
                },
                ambient: {
                    intensity: 0.5
                }
            },
            viewControl: {
                alpha: 30,
                beta: 160,
                // targetCoord: [116.46, 39.92],
                autoRotate: true,
                autoRotateAfterStill: 10,
                distance: 240
            }
        },
        series: [{
            name: 'lines3D',
            type: 'lines3D',
            zlevel: 2,
            coordinateSystem: 'globe',
            effect: {
                show: true
            },
            blendMode: 'lighter',
            lineStyle: {
                width: 2
            },
            data: [],
            silent: false
        },
        {
            name: '地域详情',
            type: 'map',
            map: '',
            zlevel: 1,
            zoom: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            data: []
        }]
    }
    // Random Data
    const rodamData = () => {
        let name = '随机点' + Math.random().toFixed(5) * 100000
        //Sydney's Location
        let longitude = -33.86
        let latitude = -151.20
        let longitude2 = Math.random() * 360 - 180
        let latitude2 = Math.random() * 180 - 90
        return {
            coords: [
                [longitude2, latitude2], //THe other country
                [longitude, latitude] //Sydney
            ],
            value: (Math.random() * 3000).toFixed(2) //color of the line
        }
    }
    for (let i = 0; i < 10; i++) {
        option.series[0].data = option.series[0].data.concat(rodamData())
    }
    EC.setOption(option)
    // mapChart.on('click', params => {
    //     let name = params.name
    //     let mapJson = 'https://raw.githubusercontent.com/Mying666/EC-JSON/gh-pages/json/' + name + '.json'
    //     EC.showLoading()
    //     $.getJSON(mapJson, geoJson => {
    //         option.title.text = '双击地图返回上级'
    //         option.series[1].map = name
    //         option.series[1].zlevel = 3
    //         echarts.registerMap(name, geoJson)
    //         // 第二层随机数据
    //         let data = []
    //         geoJson.features.forEach(d => {
    //             data.push({
    //                 name: d.properties.name,
    //                 value: (Math.random() * 3000).toFixed(2)
    //             })
    //         })
    //         option.series[1].data = data
    //         EC.setOption(option)
    //         EC.hideLoading()
    //     })
    // })
    // EC.on('dblclick', () => {
    //     option.title.text = 'Click to view more info.'
    //     option.series[1].map = ''
    //     option.series[1].zlevel = 1
    //     EC.setOption(option)
    // })
}