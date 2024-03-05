<?php

namespace FelipeVa\InertiaTable\Traits;

use Illuminate\Support\Str;

trait Makeable
{
    public static function make(string $name, ?string $label = null): self
    {
        if (is_null($label)) {
            $label = Str::headline($name);
        }

        return new self($name, $label);
    }

    public function label(string $label): self
    {
        $this->label = $label;

        return $this;
    }
}
