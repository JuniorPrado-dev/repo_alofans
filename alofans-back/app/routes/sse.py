import asyncio
from fastapi import (
    APIRouter, 
    Request
)
from sse_starlette.sse import EventSourceResponse


from routes.docs.sse import (
    SSE_STREAM, 
    SSE_ADD_EVENT
)
from services.sse import (
    Event,
    SSE
)


router = APIRouter(prefix='/sse', tags=['SSE'])


@router.post("/emit", description=SSE_ADD_EVENT)
async def new_event(event: Event):
    SSE.add_event(event)
    return {
        "message": "Event added", 
        "count": SSE.count()
    }
    
@router.get("/stream", description=SSE_STREAM)
async def stream_events(req: Request) -> EventSourceResponse:
    
    async def stream_generator():
    
        while True:
            if await req.is_disconnected():
                print("SEE Disconnected")
                break
            
            event = SSE.get_event()
            if event:
                yield f"{event.model_dump_json()}\n\n"
                
            await asyncio.sleep(0.5)
            
    return EventSourceResponse(stream_generator())