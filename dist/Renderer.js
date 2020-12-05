
class Renderer {
    renderData(data) {
        $('#postsCities').empty()
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        let newHtml = template({ data })
        $('#postsCities').append(newHtml)
    }

    renderOnload(data) {
        $('#postInload').empty()
        const source = $('#loading-template').html()
        const template = Handlebars.compile(source)
        let newHtml = template({ data })
        $('#postInload').append(newHtml)
    }
}
