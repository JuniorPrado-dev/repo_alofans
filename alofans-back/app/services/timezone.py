from pytz import all_timezones

def get_timezones() -> list[str]:
    return all_timezones

def generate_timezones_txt() -> None:
    with open('timezones.txt', 'w') as f:
        for tz in all_timezones:
            f.write(f'{tz}\n')


if __name__ == '__main__':
    generate_timezones_txt()