$(document).on('click', '.edit-user', function() {
    var modalId = $(this).data('target');
    $(modalId).modal('show');
    $(".modal-backdrop").remove();
});

    $('#addUserButton').click(function() {
        $('#addUserModal').modal('show');
        $(".modal-backdrop").remove();
    });
 