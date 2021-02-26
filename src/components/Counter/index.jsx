import React, { Component } from 'react'
import styles from './counter.module.scss'

class Counter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      isAdding: true,
      value: '1',
      valueClick: '',
      hidden: true,
      delay: 1000
    }
  }

  changeMode = () => {
    const { isAdding } = this.state
    this.setState({ isAdding: !isAdding })
  }

  changeValue = () => {
    const { count, isAdding, value } = this.state
    if (isAdding) {
      this.setState({ count: count + Number(value) })
      return
    }
    this.setState({ count: count - Number(value) })
  }

  onSelectionChange = () => {
    const value = document.getElementById('text').value
    this.setState({
      value: value
    })
  }

  autoClick = () => {
    const { delay } = this.state
    this.count = setInterval(this.changeValue, delay)
  }

  hidden = () => {
    const { hidden } = this.state
    this.setState({ hidden: !hidden })
  }

  componentDidMount () {
    const { delay } = this.state
    this.count = setTimeout(this.start, delay)
  }

  componentDidUpdate () {
    const { delay } = this.state
    this.clear()
    this.count = setTimeout(this.start, delay)
  }

  componentWillUnmount () {
    this.clear()
  }

  start = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  clear = () => {
    clearInterval(this.count)
    this.count = null
  }

  render () {
    const { count, value, valueClick, hidden } = this.state
    return (
      <article className={styles.container}>
        <h1 className={styles.header}>Вы изменяете значение на: {value} </h1>
        <p className={styles.count}>{count}</p>
        <div className={styles.block}>
          <div>
            <button className={styles.setting} onClick={this.hidden}>
              Настройки счетчика (click me):
            </button>
            <br />
            <div hidden={hidden}>
              <button onClick={this.changeValue} className={styles.button}>
                изменить шаг
              </button>
              <input
                id='text'
                type='text'
                name='quantity'
                placeholder='шаг'
                onChange={this.onSelectionChange}
                className={styles.bottom}
              ></input>
              <br />
              <button onClick={this.changeMode} className={styles.button}>
                изменить значение +/-
              </button>
              <br />
              <button onClick={this.autoClick} className={styles.button}>
                auto click {valueClick}
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </article>
    )
  }
}

export default Counter
