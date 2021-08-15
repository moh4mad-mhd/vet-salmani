$(document).ready(() => {
    var socket = io('http://192.168.1.105:3001')

    socket.on('connection')

    var new_case_flag = false

    $('#fname, #pet_type').keypress((event) => {
        if (!(event.which != 8 || event.which != 32 && isNaN(String.fromCharCode(event.which)))) {
            event.preventDefault(); //stop character from entering input
        }
    })
    $('#tel').keypress((event) => {
        if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault(); //stop character from entering input
        }
    })
    $('#submit').click((event) => {

        var data = {
            case_number: $('#case_number').text(),
            fname: $('#fname').val(),
            pet_type: $('#pet_type').val(),
            age: $('#age').val(),
            gender: $('input[name="gender"]:checked').val(),
            tel: $('#tel').val(),
            address: $('#address').val()
        }
        socket.emit('sendDr', JSON.stringify(data))

        if ($('#case').val() == 'ویزیت') {
            $.get('/visit', (confirmed) => {
                alert(confirmed)
            })
            event.preventDefault()
            $('input:text').val("")
        }
        /*
        else if (!($('#fname').val(), $('#pet_type').val(), $('#address').val(), $('#tel').val())) {
            alert("مقادیر نام و نام خانوادگی، نوع حیوان، آدرس و شماره تلفن الزامی است")
            event.preventDefault()
        }
        */
        if (new_case_flag) {


            $.post('/addNew', data, (confirmed) => {
                alert(confirmed)
            })
            $('input:text').val("")
        }


    })

    $(function () {
        new_case = () => {
            new_case_flag = true
            $.ajax({
                url: '/getLastNum',
                data: '',
                type: 'GET',
                success: (data) => {
                    $('#case_number').text(data)
                }
            })
            $('#cases').css('visibility', 'visible')
            $('#new_case').css('visibility', 'collapse')
        }

        close_case = () => {
            new_case_flag = false
            $('#new_case').css('visibility', 'visible')
            $('#cases').css('visibility', 'collapse')
        }
    })

    $('.closebtn').click(() => {
        $(this).parent.style.opacity = '0'
        setTimeout(() => {
            $(this).parent.style.display = 'none'
        }, 600);
    })
})