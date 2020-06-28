
<template>
  <!-- 团队详情页面 -->
  <default-layout>
    <div class="detail-box">
      <a-row type="flex" :gutter="[25,25]" style="width: 1060px; margin: 0 auto">
        <a-col :span="18">
          <!-- 最顶上的 用来展示基本信息 -->
          <a-row style="min-height: 120px; padding: 20px 24px 0 24px;">
            <a-col :span="9">
              <img
                :alt="team.teamName"
                src="http://i2.hdslb.com/bfs/archive/066abed3b07c383ba0ab5e3615aef68865454c5e.jpg@412w_232h_1c_100q.jpg"
                width="240px"
                height="80px"
              />
            </a-col>
            <a-col :span="14">
              <div>
                <span style="margin-right:10px">
                  <a-icon type="project" />
                  项目数: {{this.team.projectNum}}
                </span>
                <span>
                  <a-icon type="user" />
                  人员数: {{this.team.teamSize}}
                </span>
              </div>
              <div>
                <span style="margin-right:10px">团队建立时间: {{this.team.createTime}}</span>
              </div>
            </a-col>
          </a-row>

          <!-- ==================================这里是左边部分的团队菜单  ==================================-->
          <a-card
            :tab-list="teamDetailTab"
            :active-tab-key="tabKey"
            :bordered="false"
            @tabChange="key => onTabChange(key)"
          >
            <a-row v-if="tabKey === 'overview'">overview content</a-row>
            <a-row v-else-if="tabKey === 'people'">people content</a-row>
            <a-row v-else-if="tabKey === 'project'">
              <tc-team-detail-project :teamId="team.teamId" :projects="team.projects" />
            </a-row>

            <a slot="tabBarExtraContent" href="#">设置</a>
          </a-card>

          <!-- ==================================左边部分的团队菜单  END ==================================-->
        </a-col>

        <!-- 右边主要的瀑布信息流  团队基本信息、人员信息等 -->
        <a-col :span="6">
          <a-row type="flex" :gutter="[8,8]">
            <a-col :span="24">
              <h1>{{this.team.teamName}}</h1>
            </a-col>
            <a-col
              :span="24"
              class="team-profile"
              :title="this.team.teamProfile"
              style="margin-bottom: 24px"
            >{{this.team.teamProfile}}</a-col>
            <!-- 遍历显示人员头像的, 只拿12个 -->
            <a-col :span="24">
              <a-card
                title="人员"
                style="border-radius: 8px"
                :headStyle="{'border-bottom':'0','font-size':'16px','font-weight':'400'}"
              >
                <a-row type="flex" :gutter="[3,3]">
                  <a-col span="6" v-for="user in this.team.users.slice(0,12)" :key="user.userId">
                    <a-avatar v-if="user.avater" :src="user.avater" />
                    <a-avatar v-else icon="user" />
                  </a-col>
                </a-row>
              </a-card>
            </a-col>
            <!-- ========= 遍历显示人员头像的 END =========  -->
          </a-row>
        </a-col>
      </a-row>
    </div>
  </default-layout>
</template>


<script>
import TcTempApi from "@/api/tc/TcTempApi";

import TcTeamDetailProject from "@/views/tc/team/TcTeamDetailProject";

export default {
  name: "TcTeamDetail",
  components: { TcTeamDetailProject },
  data() {
    return {
      teamId: this.$route.params.teamId,
      team: {
        users: []
      },
      teamDetailTab: [
        {
          key: "overview",
          tab: "总览"
        },
        {
          key: "project",
          tab: "项目"
        },
        {
          key: "people",
          tab: "人员"
        }
      ],
      tabKey: "overview", //左边详情的tab滑动控制
      currentUserRole: undefined //当前登录角色在此团队中的权限 @see TcTempApi.USER_TESM_ROLE
    };
  },
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      TcTempApi.findTeamDetail(this.teamId)
        .then(res => {
          if (!res.data.success) {
            //报错了 or 不存在此团队? TODO 跳转到404
            return;
          }
          let detail = res.data.data;
          this.team = detail;

          //查询当前用户是不是小组成员
          let teamUser = this.team.users.find(
            u => u.userId == this.$store.state.user.uid
          );

          if (teamUser) {
            this.currentUserRole = teamUser.userRole;
          }
        })
        .catch(err => {});
    },
    onTabChange(key) {
      this.tabKey = key;
    }
  }
};
</script>

<style lang="less" scoped>
.detail-box {
  background-color: white;
  min-height: 980px;
}

.team-profile {
  color: rgba(0, 0, 0, 0.45);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-settings: "tnum";
  font-size: 14px;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: tabular-nums;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  height: 21 * 5px;
}
</style>
