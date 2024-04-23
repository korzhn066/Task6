import {
    drawRectangle,
    drawBrush,
} from './tools.js'

$.ajax({
    url: '/Home/GetAll',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
        Array.from(document.querySelectorAll(".canvases")).forEach((canvas, index) => {
            console.log(data[index])
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            let canvasWidth = canvas.width
            let canvasHeight = canvas.height

            const context = canvas.getContext("2d");

            data[index].forEach(figure => {
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
        })
    }
});


