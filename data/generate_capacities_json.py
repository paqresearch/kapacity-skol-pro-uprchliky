#!/usr/bin/env python3

import collections
import csv
import json
import os
from pprint import pprint

source_data_csv_path = os.path.join(os.path.dirname(__file__), 'Kapacity_s_tridami.csv')
orp_csv_path = os.path.join(os.path.dirname(__file__), 'CIS0065_CS.csv')
output_data_json_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'capacities.json')

if __name__ == "__main__":
    # Load ORP list

    orp_list = []

    with open(orp_csv_path, mode='r', encoding='cp1250') as orp_csv_file:
        reader = csv.DictReader(orp_csv_file, delimiter=',')

        for row in reader:
            orp_list.append(row)

    # Load source data

    source_data = []

    with open(source_data_csv_path, mode='r', encoding='utf-8-sig') as source_data_csv_file:
        fieldnames = [
            'orp_kod', 'orp_nazev',
            None, None, None, None,
            None, None, 'ms_previs',
            
            None, None, None, None, None, None, None, None, None, None, None, None, None, None,
            None,
            None, None, None, None, None, None, None, None, None,
            None, None,
            None, None,
            None, None,
            'zs_previs'
        ]
        reader = csv.DictReader(source_data_csv_file, fieldnames=fieldnames, delimiter=';')

        for row in reader:
            source_data.append(row)
            # pprint(row)
            # exit(1)

    # Transform

    output_data = []

    orp_code_to_ruian_code_map = {}
    for orp_list_item in orp_list:
        orp_code_to_ruian_code_map[orp_list_item['CHODNOTA']] = orp_list_item['KOD_RUIAN']

    for source_data_item in source_data:
        orp_code = source_data_item['orp_kod']
        orp_source_data = {k: source_data_item[k] for k in source_data_item.keys() - {None}}

        if orp_code not in orp_code_to_ruian_code_map:
            continue

        ruian_code = orp_code_to_ruian_code_map[orp_code]

        orp_output_data = collections.OrderedDict()
        orp_output_data['id'] = int(ruian_code)

        for key in sorted(orp_source_data.keys()):
            if key in []:
                orp_output_data[key] = float(orp_source_data[key].replace(',', '.'))

            if key in ['ms_previs', 'zs_previs']:
                orp_output_data[key] = int(orp_source_data[key])

        output_data.append(orp_output_data)

    # Hard-code Prague now
    output_data.append({
        'id': 19,
        'ms_previs': -2370,
        'zs_previs': -2787,
    })

    output_data = sorted(output_data, key=lambda item: int(item['id']))

    # # Write output

    with open(output_data_json_path, mode='w') as output_data_json_file:
        json.dump(output_data, output_data_json_file, ensure_ascii=False, indent=4)

    print(f'Done! Generated data json at: {os.path.abspath(output_data_json_path)}')
