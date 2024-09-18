from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import requests
import re

def setting_options_webdriver(options : object, user_agent : object) -> object:
    options.add_extension("ex.crx")
    options.add_argument(user_agent)
    options.add_argument("Accept-Encoding=gzip, deflate, br, zstd")
    options.add_argument("Accept=*/*")
    options.add_argument("Connection=keep-alive")
    options.add_argument("Accept-Language=ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7")
    return options

def build_count_url(url : str, count : int = 100) -> str:
    url += f"?count={count}"
    return url

def create_url_to_request(url : str) -> str:
    url = url.replace('?count=100','')
    url += '/render/?query=&start=0&count=100&country=RU&language=russian&currency=5'
    return url

def search_name_id(request_text : str) -> str:
    name_id : str = re.search(r"Market_LoadOrderSpread\( (?P<item_id>\d+) \)", request_text).group("item_id")
    return name_id

def create_response_to_price(name_id : str) -> object:
    response : object = requests.get(f"https://steamcommunity.com/market/itemordershistogram?country=US&"
                f"language=russian&count=100&currency=5&item_nameid={name_id}&two_factor=0").json()
    return response

def calculate_item_start_price(response : object) -> int:
    price = int(response["highest_buy_order"]) / 100
    return price

def create_currency_to_rub_list(list_prices : object) -> list:
    currency_list : list = []
    for price in list_prices:
        currency_list.append(price.text.replace('\t', ''))
    return currency_list

def create_link_item(url : str, index_item : int) -> str:
    url += f"&start={index_item}"
    return url

def get_item_data(units_items : object, index_item : int) -> list:
    item_data = units_items[index_item].text.split('\n')
    return item_data

def get_item_name(units_items : object, item_index : int) -> str:
    item_name : str = BeautifulSoup(units_items[item_index].get_attribute('innerHTML'), "lxml").find(class_="market_listing_item_name").text    
    return item_name

def get_item_price_rub(currency_list : list, index_item : int) -> int:
    item_price_rub : int = currency_list[index_item].split('\n')[1]
    return item_price_rub

def get_item_float(data : str) -> float:
    item_float : float = float(data.split(' ')[1].replace('\n',''))
    return item_float

def existence_float(data : str) -> bool:
    if data.count('Float:') == 1:
        return True
    return False

def create_list_skins(units_items : object, currency_list : list, url: str, start_price: int) -> list:
    list_skins : list = []
    index_item : int = 0
    for item in range(len(units_items)):
        if item:
            skin_data : list = []
            item_data : list = get_item_data(units_items, item)
            item_price_rub : int = get_item_price_rub(currency_list, index_item)
            item_name : str = get_item_name(units_items, item)
            item_link : str = create_link_item(url , index_item)
            for data in item_data:
                if existence_float(data):
                    item_float = get_item_float(data)
                    break
            skin_data.extend([item_name, start_price, item_price_rub, item_float, item_link])
            list_skins.append(skin_data)
            index_item += 1
    return list_skins
        
def parse_url(url : str) -> list | None:
    url = build_count_url(url)
    service = webdriver.ChromeService()
    options = webdriver.ChromeOptions()
    user_agent = UserAgent()['Chrome']
    options = setting_options_webdriver(options, user_agent)
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url=url)
    headers = {
        "User-Agent": user_agent,
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Accept-Language":"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
    }
    request_to_start_price : object = requests.get(url=url, headers=headers)    
    name_id : str = search_name_id(request_to_start_price.text)
    response : object = create_response_to_price(name_id)
    item_start_price : int = calculate_item_start_price(response)
    url_to_request : str = create_url_to_request(url)
    request : object = requests.get(url = url_to_request, headers= headers)  
    soup : object = BeautifulSoup(request.json()['results_html'], "lxml")   
    list_prices : object = soup.find_all(class_="market_listing_price market_listing_price_with_fee")
    currency_list : list = create_currency_to_rub_list(list_prices)
    units_items : object = driver.find_elements(By.CLASS_NAME, "market_listing_row")
    list_skins : list = create_list_skins(units_items, currency_list, url,item_start_price)
    driver.close()
    driver.quit()
    if list_skins:
        return list_skins
    return None
