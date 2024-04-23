let prevX = null
let prevY = null
let currentX
let currentY

export const brushMouseUpHandler = () => {
    prevX = null
    prevY = null
}

export const brushMouseMoveHandler = (e, coordinates, context, offsetLeft, offsetTop, canvasWidth, canvasHeight) => {
    if (prevX == null || prevY == null) {
        prevX = e.pageX - offsetLeft
        prevY = e.pageY - offsetTop
        return
    }

    currentX = e.pageX - offsetLeft
    currentY = e.pageY - offsetTop

    drawBrush(prevX, prevY, currentX, currentY, context)

    coordinates.push({
        "startXPercent": prevX / canvasWidth,
        "startYPercent": prevY / canvasHeight,
        "endXPercent": currentX / canvasWidth,
        "endYPercent": currentY / canvasHeight
    })

    prevX = currentX
    prevY = currentY
}

export const drawBrush = (startX, startY, endX, endY, context) => {
    context.beginPath()
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()
}

export const rectangleMouseUpHandler = (coordinates, canvasWidth, canvasHeight) => {
    coordinates.push({
        "startXPercent": prevX / canvasWidth,
        "startYPercent": prevY / canvasHeight,
        "endXPercent": currentX / canvasWidth,
        "endYPercent": currentY / canvasHeight
    })

    prevX = null
    prevY = null
}

export const rectangleMouseMoveHandler = (e, context, offsetLeft, offsetTop) => {
    if (prevX == null || prevY == null) {
        prevX = e.pageX - offsetLeft
        prevY = e.pageY - offsetTop
        return
    }

    currentX = e.pageX - offsetLeft
    currentY = e.pageY - offsetTop

    drawRectangle(prevX, prevY, currentX, currentY, context)
}

export const drawRectangle = (startX, startY, endX, endY, context) => {
    context.fillRect(startX, startY, endX - startX, endY - startY)
}

export const initializeToolbar = (context, currentTool) => {
    initializeColors(context)
    initializeTools(currentTool)
}

const initializeColors = (context) => {
    Array.from(document.querySelectorAll(".color")).forEach(color => {
        color.style.backgroundColor = color.dataset.color

        color.addEventListener("click", () => {
            context.strokeStyle = color.dataset.color
            context.fillStyle = color.dataset.color
        })
    })
}

const initializeTools = (currentTool) => {
    Array.from(document.querySelectorAll(".tool")).forEach(tool => {
        tool.addEventListener("click", () => {
            currentTool.tool = tool.dataset.tool
        })
    })
}