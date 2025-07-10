export const getEventsByLocate = (
    state: string | null,
    city: string | null,
    events: Array<TypeEventResponse>
) => {

    if (!state || !city) {
        return events;
    }

    const filteredEvents = events.filter(event => 
        event.state.toLowerCase() === state.toLowerCase()
        && 
        event.city.toLowerCase() === city.toLowerCase()
    );

    return filteredEvents;

}
// TODO: CRIAR UM FILTRO PARA ESTADOS COM SUAS CIDADES E APENAS CHAMAR NO COMPONENTE DE SELECTLOCATION
const mapEventsToListUniqueLocates = (events: TypeEventResponse[]) => {
    const locations = events.map(event => ({
        state: event.state.toUpperCase(),
        city: event.city.toUpperCase()
    }));

    const uniqueStates = Array.from(new Set(locations.map(location => location.state)));


    const groupedLocations = uniqueStates.map(state => ({
        state,
        cities: locations.filter(location => location.state === state).map(location => location.city)
    })).sort((a, b) => a.state.localeCompare(b.state));


    const uniqueStatesWithUniqueCities = groupedLocations.map(group => ({
        state: group.state,
        cities: Array.from(new Set(group.cities)).sort((a, b) => a.localeCompare(b))
    }));

    return uniqueStatesWithUniqueCities;
}

export const SearchTextInData = (
    text: string, 
    uniqueStatesWithUniqueCities: {
        state: string,
        cities: string[],
    }[]
) => {

    const filteredStatesWithCities = uniqueStatesWithUniqueCities.map((group) => ({
        ...group,
        cities: group.cities.filter((city) =>
            city.toLowerCase().includes(text.toLowerCase())
        ),
    })).filter(group => group.cities.length > 0); // Filtra grupos sem cidades correspondentes
    return (filteredStatesWithCities)

}



export default mapEventsToListUniqueLocates;

interface TypeLocation {
    city: string;
    state: string;
  }

export const getLocations=(data:TypeEventResponse[])=> {
    const uniqueLocals = mapEventsToListUniqueLocates(data);

    const response: TypeLocation[] = [];

    uniqueLocals.forEach((local) => {
      local.cities.forEach((city) => {
        response.push({ city, state: local.state });
      });
    });

    return response.sort((a, b) => a.city.localeCompare(b.city));
  }
