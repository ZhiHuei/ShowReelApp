import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Sidebar from './sidebar/Sidebar';
import {
  clips, mockedSelectedClipsPAL,
  mockedSelectedClipsNTSC, mockedAllSelectedClipsNTSC,
  mockedAllSelectedClipsPAL
} from './testdata';
import Stacked from './stacked/Stacked';

configure({ adapter: new Adapter() });

describe("Feature: Show Reel testing", () => {
  let sidebarWrapper, stackedWrapper;
  beforeEach(() => {
    sidebarWrapper = mount(<Sidebar selectClip={jest.fn()} clips={clips}></Sidebar>);
  });

  afterEach(() => {
    sidebarWrapper.unmount();
  });

  test("sidebar should populate 9 clips.", () => {
    const container = sidebarWrapper.find('.clip-container');
    expect(container.length).toBe(9);
    expect(container.first().find('.name').text()).toBe('Bud Light');
    expect(container.at(2).find('.name').text()).toBe('Audi');
  });

  test("should only accept clips (standard: PAL, definititon: SD)", () => {
    // select a PAL clip 
    sidebarWrapper.find('.clip-container').first().find('input').simulate('change', { target: { checked: true } });

    // select a NTSC clip
    sidebarWrapper.find('.clip-container').at(1).find('input').simulate('change', { target: { checked: true } });

    // select another PAL clip 
    sidebarWrapper.find('.clip-container').at(2).find('input').simulate('change', { target: { checked: true } });

    // select PAL clip (Definition: HD)
    sidebarWrapper.find('.clip-container').at(6).find('input').simulate('change', { target: { checked: true } });

    // checkbox states
    expect(sidebarWrapper.find('.clip-container').first().find('input').prop('checked')).toBe(true);
    expect(sidebarWrapper.find('.clip-container').at(1).find('input').prop('checked')).toBe(false);
    expect(sidebarWrapper.find('.clip-container').at(2).find('input').prop('checked')).toBe(true);
    expect(sidebarWrapper.find('.clip-container').at(6).find('input').prop('checked')).toBe(false);

    // cross check on duration
    stackedWrapper = shallow(<Stacked selectedClips={mockedSelectedClipsPAL}></Stacked>)
    expect(stackedWrapper.find('.duration').text()).toBe('Duration: 0:2:0:12');
  });

  test("should only accept clips (standard: NTSC, definititon: SD)", () => {
    // select a NTSC clip
    sidebarWrapper.find('.clip-container').at(1).find('input').simulate('change', { target: { checked: true } });

    // select a PAL clip
    sidebarWrapper.find('.clip-container').first().find('input').simulate('change', { target: { checked: true } });

    // select another NTSC clip 
    sidebarWrapper.find('.clip-container').at(4).find('input').simulate('change', { target: { checked: true } });

    // select NTSC clip (definition: HD)
    sidebarWrapper.find('.clip-container').at(8).find('input').simulate('change', { target: { checked: true } });

    // checkbox states
    expect(sidebarWrapper.find('.clip-container').at(1).find('input').prop('checked')).toBe(true);
    expect(sidebarWrapper.find('.clip-container').first().find('input').prop('checked')).toBe(false);
    expect(sidebarWrapper.find('.clip-container').at(4).find('input').prop('checked')).toBe(true);
    expect(sidebarWrapper.find('.clip-container').at(8).find('input').prop('checked')).toBe(false);

    // cross check on duration
    stackedWrapper = shallow(<Stacked selectedClips={mockedSelectedClipsNTSC}></Stacked>)
    expect(stackedWrapper.find('.duration').text()).toBe('Duration: 0:0:34:8');
  });

  test("all clips (standard: PAL, definititon: SD) should add up to a predefined duration.", () => {
    stackedWrapper = shallow(<Stacked selectedClips={mockedAllSelectedClipsPAL}></Stacked>)
    expect(stackedWrapper.find('.duration').text()).toBe('Duration: 0:2:11:1');
  });

  test("all clips (standard: NTSC, definititon: SD) should add up to a predefined duration.", () => {
    stackedWrapper = shallow(<Stacked selectedClips={mockedAllSelectedClipsNTSC}></Stacked>)
    expect(stackedWrapper.find('.duration').text()).toBe('Duration: 0:0:54:8');
  });
});
