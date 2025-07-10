from schemas.notify import NotifyRequest


def test_schema_NotifyRequest_success():
    notify = NotifyRequest(
        to="Title",
        title="Message",
        body="Type"
    )
    assert notify.to == "ExponentPushToken[Title]"
    assert notify.title == "Message"
    assert notify.body == "Type"


def test_schema_NotifyRequest_complete_to():
    notify = NotifyRequest(
        to="ExponentPushToken[Title]",
        title="Message",
        body="Type"
    )
    assert notify.to == "ExponentPushToken[Title]"
    assert notify.title == "Message"
    assert notify.body == "Type"