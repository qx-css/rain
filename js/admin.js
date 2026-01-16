import { extend } from 'flarum/extend';
import app from 'flarum/app';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import SettingsPage from 'flarum/components/SettingsPage';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';
import Slider from 'flarum/components/Slider';
import ColorPreviewInput from 'flarum/components/ColorPreviewInput';

app.initializers.add('qx-css-rain-admin', () => {
    app.extensionSettings['qx-css-rain'] = () => {
        return (
            <div className="RainSettings">
                <FieldSet label="雨滴特效设置">
                    <div className="Form-group">
                        <Switch
                            state={app.data.settings['qx-css.rain.enabled']}
                            onchange={value => {
                                app.data.settings['qx-css.rain.enabled'] = value;
                            }}
                        >
                            启用雨滴特效
                        </Switch>
                    </div>
                    
                    <div className="Form-group">
                        <label>雨滴密度</label>
                        <Slider
                            min="10"
                            max="100"
                            value={app.data.settings['qx-css.rain.density'] || 50}
                            onchange={value => {
                                app.data.settings['qx-css.rain.density'] = value;
                            }}
                        />
                        <div className="helpText">控制雨滴的数量（10-100）</div>
                    </div>
                    
                    <div className="Form-group">
                        <label>雨滴速度</label>
                        <Slider
                            min="1"
                            max="20"
                            value={app.data.settings['qx-css.rain.speed'] || 10}
                            onchange={value => {
                                app.data.settings['qx-css.rain.speed'] = value;
                            }}
                        />
                        <div className="helpText">数值越大，雨滴下落越快（1-20）</div>
                    </div>
                    
                    <div className="Form-group">
                        <label>雨滴颜色</label>
                        <ColorPreviewInput
                            value={app.data.settings['qx-css.rain.color'] || '#3498db'}
                            onchange={value => {
                                app.data.settings['qx-css.rain.color'] = value;
                            }}
                        />
                    </div>
                    
                    <div className="Form-group">
                        <label>透明度</label>
                        <Slider
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={app.data.settings['qx-css.rain.opacity'] || 0.6}
                            onchange={value => {
                                app.data.settings['qx-css.rain.opacity'] = value;
                            }}
                        />
                        <div className="helpText">雨滴的透明度（0.1-1）</div>
                    </div>
                    
                    <div className="Form-group">
                        <button className="Button Button--primary" onclick={() => {
                            // 保存设置
                            app.request({
                                method: 'POST',
                                url: app.forum.attribute('apiUrl') + '/settings',
                                data: app.data.settings
                            }).then(() => {
                                app.alerts.show({type: 'success'}, '设置已保存');
                            });
                        }}>
                            保存设置
                        </button>
                    </div>
                </FieldSet>
            </div>
        );
    };
});