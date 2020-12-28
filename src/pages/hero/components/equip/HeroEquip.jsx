import { useState, useEffect } from 'react';
import { useIntl, connect } from 'umi';
import { Radio, Image, Input } from 'antd';
import './HeroEquip.less';
const HeroEquip = ({ dispatch, equips }) => {
  console.log(equips);
  const { Search } = Input;
  const [synthesizeValue, setSynthesizeValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    console.log('HeroEquip');
    handlerChange();
  }, [synthesizeValue, categoryValue, searchValue]);
  /*   useEffect(()=>{
    dispatch({
      type: 'equip/getAllHeroData',
    });
  }) */
  const synthesizeRadio = [
    {
      name: '本周免费',
      value: '0',
    },
    {
      name: '新手推荐',
      value: '1',
    },
  ];
  const categoryRadio = [
    {
      name: '全部',
      value: 0,
    },
    {
      name: '攻击',
      value: 1,
    },
    {
      name: '法术',
      value: 2,
    },
    {
      name: '防御',
      value: 3,
    },
    {
      name: '移动',
      value: 4,
    },
    {
      name: '打野',
      value: 5,
    },
    {
      name: '游走',
      value: 7,
    },
  ];

  const synthesizeChange = (e) => {
    setSynthesizeValue(e.target.value);
  };
  const categoryValueChange = (e) => {
    setCategoryValue(e.target.value);
  };
  const searchValueChange = (value) => {
    setSearchValue(value);
  };
  const handlerChange = () => {
    let payload = {};
    if (categoryValue) payload.item_type = categoryValue;
    if (searchValue) payload.cname = { $regex: searchValue };
    dispatch({
      type: 'hero/getAllEquipData',
      payload,
    });
  };
  const { formatMessage } = useIntl();
  return (
    <div className="equip-wrap">
      <div className="equip-header">
        <div className="left">
          <h6>综合</h6>
          <h6>定位</h6>
        </div>
        <div className="right">
          <div className="synthesize">
            <Radio.Group onChange={synthesizeChange} value={synthesizeValue}>
              {synthesizeRadio.map((it) => (
                <Radio value={it.value}>{it.name}</Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="equip-category">
            <Radio.Group onChange={categoryValueChange} value={categoryValue}>
              {categoryRadio.map((it) => (
                <Radio value={it.value}>{it.name}</Radio>
              ))}
            </Radio.Group>
            <Search
              className="equip-search"
              onSearch={searchValueChange}
              placeholder={formatMessage({
                id: 'pages.equip.via.heroVia.search',
                defaultMessage: '请输入你想要搜索的装备',
              })}
            />
          </div>
        </div>
      </div>
      <div className="equip-container">
        {equips.map((equip) => (
          <div className="equip" key={equip.item_id}>
            <Image width={86} src={require(`@/assets/images/equip/${equip.item_id}.jpg`)} />
            <p className="equip-name">{equip.item_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(({ hero }) => ({
  equips: hero.equips,
}))(HeroEquip);
