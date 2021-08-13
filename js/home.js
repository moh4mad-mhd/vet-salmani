$(document).ready(() => {
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

        if ($('#case').val() == 'ویزیت') {
            $.get('/visit', (confirmed) => {
                alert(confirmed)
            })
            event.preventDefault()
            $('input:text').val("")
        }

        else if (!($('#fname').val(), $('#pet_type').val(), $('#address').val(), $('#tel').val())) {
            alert("مقادیر نام و نام خانوادگی، نوع حیوان، آدرس و شماره تلفن الزامی است")
            event.preventDefault()
        }
        if (new_case_flag) {
            var data = {
                case_number: $('#case_number').text(),
                fname: $('#fname').val(),
                pet_type: $('#pet_type').val(),
                age: $('#age').val(),
                gender: $('input[name="gender"]:checked').val(),
                tel: $('#tel').val(),
                address: $('#address').val()
            }

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
})