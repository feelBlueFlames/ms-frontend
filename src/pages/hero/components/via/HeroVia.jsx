import { useState, useEffect } from 'react';
import { useIntl, connect, FormattedMessage } from 'umi';
import { Layout, Radio, Image, Form, Input, Button, Checkbox } from 'antd';
import './HeroVia.less';
const HeroVia = ({ dispatch, heros }) => {
  const { Search } = Input;
  const { Header, Footer, Sider, Content } = Layout;
  const [synthesizeValue, setSynthesizeValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    console.log(111);
    handlerChange();
  }, [synthesizeValue, categoryValue, searchValue]);
  /*   useEffect(()=>{
    dispatch({
      type: 'hero/getAllHeroData',
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
      name: '坦克',
      value: 3,
    },
    {
      name: '战士',
      value: 1,
    },
    {
      name: '刺客',
      value: 4,
    },
    {
      name: '法师',
      value: 2,
    },
    {
      name: '射手',
      value: 5,
    },
    {
      name: '辅助',
      value: 6,
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
    if (categoryValue) payload.$or = [{ hero_type: categoryValue }, { hero_type2: categoryValue }];
    if (searchValue) payload.cname = { $regex: searchValue };
    dispatch({
      type: 'hero/getAllHeroData',
      payload,
    });
  };
  const { formatMessage } = useIntl();
  return (
    <div className="hero-wrap">
      <div className="hero-header">
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
          <div className="hero-category">
            <Radio.Group onChange={categoryValueChange} value={categoryValue}>
              {categoryRadio.map((it) => (
                <Radio value={it.value}>{it.name}</Radio>
              ))}
            </Radio.Group>
            <Search
              className="hero-search"
              onSearch={searchValueChange}
              placeholder={formatMessage({
                id: 'pages.hero.via.heroVia.search',
                defaultMessage: '请输入你想要搜索的英雄',
              })}
            />
          </div>
        </div>
      </div>
      <div className="hero-container">
        {heros.map((hero) => (
          <div className="hero" key={hero._id}>
            <Image width={86} src={require(`@/assets/images/via/${hero.ename}.jpg`)} />
            <p className="hero-name">{hero.cname}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(({ hero }) => ({
  heros: hero.heros,
}))(HeroVia);
