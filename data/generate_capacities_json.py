#!/usr/bin/env python3

import collections
import csv
import json
import os
from pprint import pprint
from tkinter import E

source_data_csv_path = os.path.join(os.path.dirname(__file__), 'Kapacity_s_tridami.csv')
orp_csv_path = os.path.join(os.path.dirname(__file__), 'CIS0065_CS.csv')
praha_obvody_csv_path = os.path.join(os.path.dirname(__file__), 'CIS0072_CS.csv')
output_data_json_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'capacities.json')

if __name__ == "__main__":
    # Load ORP list

    orp_list = []

    with open(orp_csv_path, mode='r', encoding='cp1250') as orp_csv_file:
        reader = csv.DictReader(orp_csv_file, delimiter=',')

        for row in reader:
            orp_list.append(row)

    # Load Praha obvody list

    praha_obvody_list = []

    with open(praha_obvody_csv_path, mode='r', encoding='cp1250') as praha_obvody_csv_file:
        reader = csv.DictReader(praha_obvody_csv_file, delimiter=',')

        for row in reader:
            praha_obvody_list.append(row)

    # Load source data

    source_data = []

    with open(source_data_csv_path, mode='r', encoding='utf-8-sig') as source_data_csv_file:
        fieldnames = [
            'orp_kod', 'orp_nazev',
            'ms_zapsani', None, 'ms_kapacity_duben', 'ms_kapacity_zari',
            'ms_uprchliku', 'ms_zapsani_z_nahlasenych', 'ms_previs',
            
            'zs_zapsani', 'zs_kapacity_duben_malotridky', 'zs_kapacity_duben_1', 'zs_kapacity_duben_2', 'zs_kapacity_duben_3', 'zs_kapacity_duben_4', 'zs_kapacity_duben_5', 'zs_kapacity_duben_6', 'zs_kapacity_duben_7', 'zs_kapacity_duben_8', 'zs_kapacity_duben_9', 'zs_kapacity_duben_sp1', 'zs_kapacity_duben_sp2', 'zs_kapacity_zari',
            'zs_uprchliku',
            None, None, None, None, None, None, None, None, None,
            None, None,
            'zs_previs_1_stupen', 'zs_previs_2_stupen',
            None, 'zs_zapsani_z_nahlasenych',
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

    obvod_code_to_ruian_code_map = {}
    for praha_obvody_list_item in praha_obvody_list:
        obvod_code_to_ruian_code_map[praha_obvody_list_item['CHODNOTA']] = '99' + praha_obvody_list_item['KOD_RUIAN']

    for source_data_item in source_data:
        orp_code = source_data_item['orp_kod']
        orp_source_data = {k: source_data_item[k] for k in source_data_item.keys() - {None}}

        ruian_code = None
        if orp_code == '0':
            # Ignore orp code 0
            continue
        elif orp_code in orp_code_to_ruian_code_map:
            ruian_code = orp_code_to_ruian_code_map[orp_code]
        elif orp_code in obvod_code_to_ruian_code_map:    
            ruian_code = obvod_code_to_ruian_code_map[orp_code]

        orp_output_data = collections.OrderedDict()
        orp_output_data['id'] = int(ruian_code)
        orp_output_data['zs_kapacity_duben'] = 0

        for key in sorted(orp_source_data.keys()):
            if key in ['zs_kapacity_duben_malotridky', 'zs_kapacity_duben_1', 'zs_kapacity_duben_2', 'zs_kapacity_duben_3', 'zs_kapacity_duben_4', 'zs_kapacity_duben_5', 'zs_kapacity_duben_6', 'zs_kapacity_duben_7', 'zs_kapacity_duben_8', 'zs_kapacity_duben_9', 'zs_kapacity_duben_sp1', 'zs_kapacity_duben_sp2']:
                orp_output_data['zs_kapacity_duben'] += int(orp_source_data[key].replace(' ', ''))

            if key in []:
                orp_output_data[key] = float(orp_source_data[key].replace(',', '.'))

            if key in ['ms_zapsani_z_nahlasenych', 'zs_zapsani_z_nahlasenych']:
                orp_output_data[key] = int(orp_source_data[key].replace('%', ''))

            if key in ['ms_zapsani', 'ms_kapacity_duben', 'ms_kapacity_zari', 'ms_uprchliku', 'ms_previs', 'zs_zapsani', 'zs_kapacity_zari', 'zs_uprchliku', 'zs_previs', 'zs_previs_1_stupen', 'zs_previs_2_stupen']:
                orp_output_data[key] = int(orp_source_data[key].replace(' ', ''))

        # Temp fix Praha 4
        if orp_code == '1104':
            orp_output_data['zs_kapacity_zari'] = 244
            orp_output_data['zs_previs'] = 319
            orp_output_data['zs_previs_1_stupen'] = 178
            orp_output_data['zs_previs_2_stupen'] = 141

        output_data.append(orp_output_data)

    output_data = sorted(output_data, key=lambda item: int(item['id']))

    # # Write output

    with open(output_data_json_path, mode='w') as output_data_json_file:
        json.dump(output_data, output_data_json_file, ensure_ascii=False, indent=4)

    print(f'Done! Generated data json at: {os.path.abspath(output_data_json_path)}')
