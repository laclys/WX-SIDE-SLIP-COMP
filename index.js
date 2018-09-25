/*
 * @Author: Lac 
 * @Date: 2018-09-25 23:40:15 
 * @Last Modified by:   Lac 
 * @Last Modified time: 2018-09-25 23:40:15 
 */
Component({

  properties: {
    id: String,
    edit: Boolean,
    del: Boolean,
    btnTop: Number
  },

  data: {
    transitionTime: 0,
    translateX: 0,
    translateXDel: 70,
    translateXEdit: 140,
    _lastArr: [],
    _startX: 0,
    _currentX: 0,
    _btnArr: [], 
    _maxX: 0
  },

  methods: {
    handleTouchstart: function(e) {
      if (e.touches.length !== 1) {
        return
      }
      this.data._lastArr = []
      this.data._startX = e.touches[0].clientX
      this.data._lastArr.push(e.touches[0].clientX)
      this.setData({
        transitionTime: 0
      })
    },

    handleTouchMove: function(e) {
      if (e.touches.length !== 1) {
        return
      }
      this.data._lastArr.push(e.touches[0].clientX)
      let moveed = this.data._startX - e.touches[0].clientX
      let cX = this.data._currentX + moveed
      if (cX < 0) {
        cX = 0
      }
      if (cX > this.data._maxX) {
        cX = this.data._maxX
      }

      this.setData({
        translateX: cX,
        translateXDel: 70 - (this.data._btnArr.length === 1 ? cX : cX / 2),
        translateXEdit: 140 - cX,
      })
    },

    handleTouchEnd: function(e) {
      if (e.changedTouches.length !== 1) {
        return
      }
      let moveed = this.data._startX - e.changedTouches[0].clientX
      let cX = this.data._currentX + moveed
      let _lastArr = this.data._lastArr
      let _lastArrLength = _lastArr.length
      let __open = (_lastArr[_lastArrLength - 1] - (_lastArr[_lastArrLength - 2] || _lastArr[_lastArrLength - 1])) < 0 ? true : false
      if (cX < 0) {
        cX = 0
      }
      if (cX > this.data._maxX) {
        cX = this.data._maxX
      }
      if (__open && cX < 10) {
        __open = false
      }
      this.setData({
        transitionTime: __open ? 400 : 200,
        translateX: __open ? this.data._maxX : 0,
        translateXDel: __open ? 0 : 70,
        translateXEdit: __open ? 0 : 140,
      })
      this.data._currentX = __open ? this.data._maxX : 0;
    },

    handleTap: function(e) {
      setTimeout(() => {
        console.log(e.target.dataset.type, this.data.id)
      }, 300)
    }
  },

  ready() {
    let _btnArr = []
    if (this.data.edit) {
      _btnArr.push({
        text: '编辑',

        type: 'edit'
      });
    }
    if (this.data.del) {
      _btnArr.push({
        text: '删除',
        type: 'del'
      })
    }
    this.setData({
      _btnArr,
      _maxX: _btnArr.length * 70
    })
  }
})