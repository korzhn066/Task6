import {
    brushMouseMoveHandler,
    brushMouseUpHandler,
    rectangleMouseMoveHandler,
    rectangleMouseUpHandler,
    drawRectangle,
    drawBrush,
    initializeToolbar,
} from './tools.js'

const urlParams = new URLSearchParams(window.location.search);
const canvasKey = urlParams.get('key');

let canvas = document.getElementById("canvas");

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

let context = canvas.getContext("2d")

let offsetTop = canvas.offsetTop
let offsetLeft = canvas.offsetLeft
let canvasWidth = canvas.width
let canvasHeight = canvas.height

$.ajax({
    url: '/Home/GetCanvasById?key=' + canvasKey,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        data.forEach(figure => {
            let oldColor = context.fillStyle
            context.fillStyle = figure.color
            context.strokeStyle = figure.color

            switch (figure.figureType) {
                case 0:
                    figure.coordinates.forEach((coordinate) => {
                        drawBrush(
                            coordinate.startXPercent * canvasWidth,
                            coordinate.startYPercent * canvasHeight,
                            coordinate.endXPercent * canvasWidth,
                            coordinate.endYPercent * canvasHeight,
                            context
                        )
                    })
                    break
                case 1:
                    drawRectangle(
                        figure.coordinates[0].startXPercent * canvasWidth,
                        figure.coordinates[0].startYPercent * canvasHeight,
                        figure.coordinates[0].endXPercent * canvasWidth,
                        figure.coordinates[0].endYPercent * canvasHeight,
                        context
                    )
                    break
            }

            context.fillStyle = oldColor
            context.strokeStyle = oldColor
        })
    }
});

let currentTool = {
    tool: '0'
}

initializeToolbar(context, currentTool)

let draw = false

let coordinates = []

canvas.addEventListener("mousedown", (e) => {
    draw = true
})

canvas.addEventListener("mouseup", (e) => {
    switch(currentTool.tool) {
        case '0':
            brushMouseUpHandler()
            sendData(0, coordinates)
            break
        case '1':
            rectangleMouseUpHandler(coordinates, canvasWidth, canvasHeight)
            sendData(1, coordinates)
            break;
    }

    coordinates = []
    draw = false
})

canvas.addEventListener("mousemove", (e) => {
    
    if (draw) {
        switch (currentTool.tool) {
            case '0':
                brushMouseMoveHandler(e, coordinates, context, offsetLeft, offsetTop, canvasWidth, canvasHeight)
                break
            case '1':
                rectangleMouseMoveHandler(e, context, offsetLeft, offsetTop)
                break
        }
    }
})

window.addEventListener('resize', function () {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    initializeCanvas()
});

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/paint")
    .build();

hubConnection.on(canvasKey.toString(), function (data) {
    let oldColor = context.fillStyle
    context.fillStyle = data.color
    context.strokeStyle = data.color

    switch (data.figureType) {
        case 0:
            data.coordinates.forEach((coordinate) => {
                drawBrush(
                    coordinate.startXPercent * canvasWidth,
                    coordinate.startYPercent * canvasHeight,
                    coordinate.endXPercent * canvasWidth,
                    coordinate.endYPercent * canvasHeight,
                    context
                )
            })
            break
        case 1:
            drawRectangle(
                data.coordinates[0].startXPercent * canvasWidth,
                data.coordinates[0].startYPercent * canvasHeight,
                data.coordinates[0].endXPercent * canvasWidth,
                data.coordinates[0].endYPercent * canvasHeight,
                context
            )
            break
    }

    context.fillStyle = oldColor
    context.strokeStyle = oldColor
});

hubConnection.start();

const sendData = (figureType, coordinates) => {
    let figure = {
        "figureType": figureType,
        "coordinates": coordinates,
        "color": context.fillStyle
    }

    if (coordinates.length > 30) {
        let temp = []
        coordinates.forEach((element, index) => {
            temp.push(element)

            if (index % 29 == 0) {
                figure.coordinates = temp
                hubConnection.invoke("Send", figure, parseInt(canvasKey))

                temp = []
            }
        })        

        figure.coordinates = temp
        hubConnection.invoke("Send", figure, parseInt(canvasKey))
    } else {
        hubConnection.invoke("Send", figure, parseInt(canvasKey))
    }
}

const initializeCanvas = () => {
    $.ajax({
        url: '/Home/GetCanvasById?key=' + canvasKey,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            data.forEach(figure => {
                let oldColor = context.fillStyle
                context.fillStyle = figure.color
                context.strokeStyle = figure.color

                switch (figure.figureType) {
                    case 0:
                        figure.coordinates.forEach((coordinate) => {
                            drawBrush(
                                coordinate.startXPercent * canvasWidth,
                                coordinate.startYPercent * canvasHeight,
                                coordinate.endXPercent * canvasWidth,
                                coordinate.endYPercent * canvasHeight,
                                context
                            )
                        })
                        break
                    case 1:
                        drawRectangle(
                            figure.coordinates[0].startXPercent * canvasWidth,
                            figure.coordinates[0].startYPercent * canvasHeight,
                            figure.coordinates[0].endXPercent * canvasWidth,
                            figure.coordinates[0].endYPercent * canvasHeight,
                            context
                        )
                        break
                }

                context.fillStyle = oldColor
                context.strokeStyle = oldColor
            })
        }
    });
}

document.getElementById("export").addEventListener("click", () => {
    let canvasUrl = canvas.toDataURL()
    const createEl = document.createElement('a')

    createEl.href = canvasUrl;
    createEl.download = "download-this-canvas.jpeg"
    createEl.click()
    createEl.remove()
})