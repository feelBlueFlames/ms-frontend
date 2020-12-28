import { PageContainer } from '@ant-design/pro-layout';

import { Tabs } from 'antd';

const { TabPane } = Tabs;
import styles from './index.less';
import HeroVia from './components/via/HeroVia';
import HeroEquip from './components/equip/HeroEquip';
import HeroSkill from './components/skill/HeroSkill';
export default () => {
  const callback = (key) => {
    console.log(key);
  };
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="英雄" key="1">
          {<HeroVia />}
        </TabPane>
        <TabPane tab="局内道具" key="2">
          {<HeroEquip />}
        </TabPane>
        <TabPane tab="召唤师技能" key="3">
          {<HeroSkill />}
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};
